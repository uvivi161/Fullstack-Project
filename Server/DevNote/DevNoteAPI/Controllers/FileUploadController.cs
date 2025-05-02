using Amazon.S3;
using Amazon.S3.Model;
using DevNote.API.Models;
using DevNote.Core.Models;
using DevNote.Core.Services;
using Microsoft.AspNetCore.Mvc;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DevNote.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FileUploadController : ControllerBase
    {
        //// POST api/<FileUpload>
        //[HttpPost("upload")]
        //public async Task<IActionResult> UploadFile([FromForm] IFormFile file)
        //{
        //    // בדיקה האם הקובץ תקין  
        //    if (file == null || file.Length == 0)
        //    {
        //        return BadRequest("קובץ לא תקין");
        //    }

        //    // שליחת הקובץ לשירות האחסון וקבלת כתובת הקובץ בענן  
        //    var fileUrl = await _fileUploadService.UploadFileAsync(file);

        //    // החזרת ה-URL של הקובץ בתשובת ה-API  
        //    return Ok(new { fileUrl });
        //}

        //// PUT api/<FileUpload>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/<FileUpload>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}

        private readonly IAmazonS3 _s3Client;
        private readonly IFileUploadService _FileService;

        public FileUploadController(IAmazonS3 s3Client, IFileUploadService context)
        {
            _s3Client = s3Client;
            _FileService = context;
        }

        [HttpGet("presigned-url")]
        public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName)
        {
            //var request = new GetPreSignedUrlRequest
            //{
            //    BucketName = "devnote-files",
            //    Key = fileName,
            //    Verb = HttpVerb.PUT,
            //    Expires = DateTime.UtcNow.AddMinutes(5),
            //    ContentType = fileName.EndsWith(".pdf") ? "application/pdf" : "audio/mpeg"
            //};

            //string url = _s3Client.GetPreSignedURL(request);
            //return Ok(new { url });

            string s3Key = $"uploads/{Guid.NewGuid()}_{fileName}";

            var request = new GetPreSignedUrlRequest
            {
                BucketName = "devnote-files",
                Key = s3Key,  // 🟢 שימוש ב-S3 Key הנכון
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddMinutes(5),
                ContentType = fileName.EndsWith(".pdf") ? "application/pdf" : "audio/mpeg"
            };

            string url = _s3Client.GetPreSignedURL(request);

            return Ok(new { url, s3Key }); // 🔹 מחזירים גם את ה-S3 Key
        }

        [HttpGet("presigned-url-download")]
        public IActionResult GetDownloadUrl([FromQuery] string s3Key)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = "devnote-files",
                Key = s3Key,
                Verb = HttpVerb.GET,
                Expires = DateTime.UtcNow.AddMinutes(5),
            };

            var url = _s3Client.GetPreSignedURL(request);
            return Ok(new { url });
        }

        //[HttpPost("direct-upload")]
        //public async Task<IActionResult> UploadFile([FromForm] IFormFile file)
        //{
        //    if (file == null || file.Length == 0)
        //        return BadRequest("קובץ חסר!");

        //    var request = new PutObjectRequest
        //    {
        //        BucketName = "devnote-files", // **👈 יש לשנות בהתאם**
        //        Key = file.FileName,
        //        InputStream = file.OpenReadStream(),
        //        ContentType = file.ContentType
        //    };

        //    var response = await _s3Client.PutObjectAsync(request);
        //    if (response.HttpStatusCode == System.Net.HttpStatusCode.OK)
        //        return Ok(new { message = "הקובץ הועלה בהצלחה ל-S3!", fileName = file.FileName });

        //    return StatusCode(500, "שגיאה בהעלאת הקובץ.");
        //}

        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpPost("direct-upload")]
        public async Task<IActionResult> UploadFile([FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("קובץ חסר!");

            try
            {
                var request = new PutObjectRequest
                {
                    BucketName = "devnote-files",
                    Key = file.FileName,
                    InputStream = file.OpenReadStream(),
                    ContentType = file.ContentType
                };

                var response = await _s3Client.PutObjectAsync(request);
                if (response.HttpStatusCode == System.Net.HttpStatusCode.OK)
                    return Ok(new { message = "הקובץ הועלה בהצלחה ל-S3!", fileName = file.FileName });

                return StatusCode(500, "שגיאה בהעלאת הקובץ.");
            }
            catch (AmazonS3Exception ex)
            {
                // שגיאות שקשורות ל-S3
                return StatusCode(500, $"S3 Error: {ex.Message}");
            }
            catch (Exception ex)
            {
                // כל שגיאה אחרת
                return StatusCode(500, $"General Error: {ex.Message}");
            }
        }

        [HttpPost("UploadTo-DB")]
        public async Task<IActionResult> UploadFileToDB([FromBody] FileUploadPostModel fi)
        {
            var file = new FileUpload { FileName = fi.FileName, FileUrl = fi.FileUrl, S3Key = fi.S3Key, UserId = fi.UserId };
            if (_FileService.PostNewFile(file))
                return Ok();
            return NotFound("this file is already exist");
        }

    }
}
