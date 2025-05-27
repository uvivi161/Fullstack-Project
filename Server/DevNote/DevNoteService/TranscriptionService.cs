//using Amazon.S3;
//using Amazon.S3.Transfer;
//using DevNote.Core.Dto_s;
//using DevNote.Core.Models;
//using DevNote.Core.Repositories;
//using DevNote.Core.Services;
//using iText.Kernel.Pdf;
//using iText.Layout.Element;
//using iText.Layout;
//using Microsoft.Extensions.Configuration;
//using Newtonsoft.Json.Linq;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net.Http.Json;
//using System.Threading.Tasks;
//using iText.IO.Font.Constants;
//using iText.Kernel.Font;
//using System.Text.Json;
//using DevNote.Core;
//using Newtonsoft.Json;
//using System.Net.Http;
//using JsonSerializer = System.Text.Json.JsonSerializer;
//using Amazon.S3.Model;
//using Amazon.Runtime.Internal.Endpoints.StandardLibrary;
//using System.Net.Http.Headers;
//using iText.Kernel.Crypto.Securityhandler;
//using Org.BouncyCastle.Crypto; // צריך גם את זה אם תרצי בהמשך
using Amazon.S3;
using Amazon.S3.Model;
using DevNote.Core.Dto_s;
using DevNote.Core.Repositories;
using DevNote.Core.Services;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;
//using System;
//using System.IO;
//using System.Threading.Tasks;
using Amazon.S3.Transfer;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.IO.Font.Constants;
using iText.Kernel.Font;
using DevNote.Core.Models.files;
using iText.IO.Font;
using iText.Layout.Properties;


namespace DevNote.Service
{
    public class TranscriptionService : ITranscriptionService
    {
        private readonly ITranscriptionRepository _repo;
        private readonly IAmazonS3 _s3Client;
        private readonly IConfiguration _config;

        public TranscriptionService(ITranscriptionRepository repo, IAmazonS3 s3Client, IConfiguration config)
        {
            _repo = repo;
            _s3Client = s3Client;
            _config = config;
        }

        ///עובד בלי יצירת קובץ pdf
        public async Task<TranscriptionResultDto> TranscribeAndSaveAsync(TranscriptionDto request)
        {
            try
            {
                var apiKey = Environment.GetEnvironmentVariable("HebrewAI__ApiKey");
                if (string.IsNullOrWhiteSpace(apiKey))
                {
                    Console.WriteLine("❌ apiKey לא נמצא בקובץ ההגדרות או שהוא ריק!");
                    return new TranscriptionResultDto
                    {
                        Success = false,
                        ErrorMessage = "הודעת השגיאה הרלוונטית"
                    };
                }

                var url = Environment.GetEnvironmentVariable("HebrewAI__Url");
                using var httpClient = new HttpClient();
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

                // ✅ הורדה של קובץ האודיו מ-S3 בעזרת S3Client
                Console.WriteLine($"🗂️ קובץ אודיו מ-S3: {request.FileUrl}");

                var s3Key = request.S3Key;
                var bucketName = _config["AWS:BucketName"];

                Console.WriteLine("🪣 Bucket name: " + bucketName);
                Console.WriteLine("🔑 S3 Key: " + s3Key);

                var getRequest = new GetObjectRequest
                {
                    BucketName = bucketName,
                    Key = s3Key
                };

                using var s3Response = await _s3Client.GetObjectAsync(getRequest);
                using var audioStream = new MemoryStream();
                await s3Response.ResponseStream.CopyToAsync(audioStream);
                audioStream.Position = 0;

                Console.WriteLine($"📏 גודל קובץ: {audioStream.Length} bytes");

                // ✅ בניית תוכן הבקשה Multipart
                using var form = new MultipartFormDataContent();

                var fileContent = new StreamContent(audioStream);
                fileContent.Headers.ContentDisposition = new ContentDispositionHeaderValue("form-data")
                {
                    Name = "\"file\"",
                    FileName = $"\"{Path.GetFileName(request.S3Key)}\""
                };
                fileContent.Headers.ContentType = new MediaTypeHeaderValue("audio/mpeg");
                form.Add(fileContent);

                var languageContent = new StringContent("he");
                languageContent.Headers.ContentDisposition = new ContentDispositionHeaderValue("form-data")
                {
                    Name = "\"language\""
                };
                form.Add(languageContent);

                // ✅ שליחה ל-API לתמלול
                Console.WriteLine("🚀 שולח בקשה לתמלול...", url);
                var response = await httpClient.PostAsync(url, form);
                var responseContent = await response.Content.ReadAsStringAsync();

                Console.WriteLine($"📡 STATUS: {response.StatusCode}");
                Console.WriteLine($"📨 RESPONSE: {responseContent}");

                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"❌ תמלול נכשל: {response.StatusCode}");
                    return new TranscriptionResultDto
                    {
                        Success = false,
                        ErrorMessage = "הודעת השגיאה הרלוונטית"
                    };
                }

                var jobId = JObject.Parse(responseContent)["transcriptionId"]?.ToString();
                if (string.IsNullOrWhiteSpace(jobId))
                {
                    Console.WriteLine("❌ לא התקבל transcription_id");
                    return new TranscriptionResultDto
                    {
                        Success = false,
                        ErrorMessage = "הודעת השגיאה הרלוונטית"
                    };
                }

                Console.WriteLine($"🆔 מזהה תמלול: {jobId}");

                // ✅ חזרה עד שהתמלול מוכן
                string transcriptText = "";
                for (int i = 0; i < 30; i++)
                {
                    await Task.Delay(2000);

                    var statusResponse = await httpClient.GetAsync($"https://hebrew-ai.com/api/transcribe?id={jobId}");
                    var statusContent = await statusResponse.Content.ReadAsStringAsync();
                    var statusJson = JObject.Parse(statusContent);
                    var status = statusJson["status"]?.ToString();

                    Console.WriteLine($"🔄 סטטוס תמלול: {status}");

                    if (status == "COMPLETED")
                    {
                        transcriptText = statusJson["text"]?.ToString() ?? "";
                        break;
                    }
                    else if (status == "FAILED")
                    {
                        Console.WriteLine("❌ תמלול נכשל לפי השרת.");
                        return new TranscriptionResultDto
                        {
                            Success = false,
                            ErrorMessage = "הודעת השגיאה הרלוונטית"
                        };
                    }
                }

                if (string.IsNullOrWhiteSpace(transcriptText))
                {
                    Console.WriteLine("❌ תמלול נכשל (לא התקבל טקסט).");
                    return new TranscriptionResultDto
                    {
                        Success = false,
                        ErrorMessage = "הודעת השגיאה הרלוונטית"
                    };
                }

                Console.WriteLine("✅ תמלול הושלם בהצלחה.");
                return new TranscriptionResultDto
                {
                    Success = true,
                    TranscriptText = transcriptText,
                    TranscriptionId = jobId,
                    FileUrl = request.FileUrl
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine("❌ שגיאה בתהליך תמלול:");
                Console.WriteLine(ex.Message);
                if (ex.InnerException != null)
                {
                    Console.WriteLine("📌 פנימית:");
                    Console.WriteLine(ex.InnerException.Message);
                }
            }

            return new TranscriptionResultDto { Success = false, ErrorMessage = "הודעת השגיאה הרלוונטית" };
        }

        private string ReverseString(string input)
        {
            if (string.IsNullOrEmpty(input)) return input;
            var array = input.ToCharArray();
            Array.Reverse(array);
            return new string(array);
        }

        public async Task<string> SaveEditedTranscriptAsync(SaveEditedTranscriptDto dto)
        {
            try
            {
                using var originalStream = new MemoryStream();
                var writer = new PdfWriter(originalStream);

                // הגדרת הפונט לעברית
                var fontPath = Path.Combine(AppContext.BaseDirectory, "fonts", "DAVID.ttf");
                var font = PdfFontFactory.CreateFont(fontPath, PdfEncodings.IDENTITY_H, PdfFontFactory.EmbeddingStrategy.PREFER_EMBEDDED);

                var pdf = new PdfDocument(writer);
                var doc = new Document(pdf);
                doc.SetFont(font);

                // הגדרת יישור לימין (RTL)
                var paragraph = new Paragraph(dto.EditedText)
                    .SetFont(font)
                    .SetTextAlignment(iText.Layout.Properties.TextAlignment.RIGHT)
                    .SetBaseDirection(iText.Layout.Properties.BaseDirection.RIGHT_TO_LEFT);

                doc.Add(paragraph);
                doc.Close();

                // המרת ה-Stream ל-byte[] עבור העלאה ל-S3
                var pdfBytes = originalStream.ToArray();

                using var pdfStream = new MemoryStream(pdfBytes);
                pdfStream.Position = 0;

                // יצירת מפתח ייחודי ל-PDF
                string pdfKey = $"transcriptions/{Guid.NewGuid()}.pdf";

                // הגדרת בקשה להעלאה ל-S3
                var uploadRequest = new TransferUtilityUploadRequest
                {
                    InputStream = pdfStream,
                    Key = pdfKey,
                    BucketName = _config["AWS:BucketName"],
                    ContentType = "application/pdf"
                };

                // העלאת הקובץ ל-S3
                var transferUtility = new TransferUtility(_s3Client);
                await transferUtility.UploadAsync(uploadRequest);

                // יצירת URL להורדה
                string pdfUrl = $"https://{_config["AWS:BucketName"]}.s3.amazonaws.com/{pdfKey}";

                // שמירת פרטי התמלול במסד הנתונים
                var transcription = new Transcription
                {
                    UserId = dto.UserId.ToString(),
                    OriginalFileUrl = dto.OriginalFileUrl,
                    TranscriptionPdfUrl = pdfUrl
                };

                var saved = await _repo.SaveTranscriptionAsync(transcription);
                return saved ? pdfUrl : string.Empty;
            }
            catch (Exception ex)
            {
                // הדפסת שגיאה במקרה של כשלון
                Console.WriteLine(ex);
                return string.Empty;
            }
        }
    }


}
