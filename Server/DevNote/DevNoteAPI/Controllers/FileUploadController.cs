using Amazon.S3;
using Amazon.S3.Model;
using DevNote.Core.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DevNote.API.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class FileUploadController : ControllerBase
    {
        //private readonly IFileUploadService _fileUploadService;
        //public FileUploadController(IFileUploadService fileUploadService)
        //{
        //    _fileUploadService = fileUploadService;
        //}

        ////// GET: api/<FileUpload>
        ////[HttpGet]
        ////public IEnumerable<string> Get()
        ////{
        ////    return new string[] { "value1", "value2" };
        ////}

        ////// GET api/<FileUpload>/5
        ////[HttpGet("{id}")]
        ////public string Get(int id)
        ////{
        ////    return "value";
        ////}

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

        ////// PUT api/<FileUpload>/5
        ////[HttpPut("{id}")]
        ////public void Put(int id, [FromBody]string value)
        ////{
        ////}

        ////// DELETE api/<FileUpload>/5
        ////[HttpDelete("{id}")]
        ////public void Delete(int id)
        ////{
        ////}
        ///
        //private readonly IAmazonS3 _s3Client;

        //public FileUploadController(IAmazonS3 s3Client)
        //{
        //    _s3Client = s3Client;
        //} 

        //[HttpGet("presigned-url")]
        //public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName)
        //{
        //    var request = new GetPreSignedUrlRequest
        //    {
        //        BucketName = "devnote-mp3-files",
        //        Key = fileName,
        //        Verb = HttpVerb.PUT,
        //        Expires = DateTime.UtcNow.AddMinutes(5),
        //        ContentType = "mp3" // או סוג הקובץ המתאים
        //    };

        //    string url = _s3Client.GetPreSignedURL(request);
        //    return Ok(new { url });
        //}



        //[HttpPost("direct-upload")]
        //public async Task<IActionResult> UploadFile([FromForm] IFormFile file)
        //{
        //    if (file == null || file.Length == 0)
        //        return BadRequest("קובץ חסר!");

        //    var request = new PutObjectRequest
        //    {
        //        BucketName = "devnote-mps-files", // **👈 יש לשנות בהתאם**
        //        Key = file.FileName,
        //        InputStream = file.OpenReadStream(),
        //        ContentType = file.ContentType
        //    }; 

        //    var response = await _s3Client.PutObjectAsync(request);
        //    if (response.HttpStatusCode == System.Net.HttpStatusCode.OK)
        //        return Ok(new { message = "הקובץ הועלה בהצלחה ל-S3!", fileName = file.FileName });
              
        //    return StatusCode(500, "שגיאה בהעלאת הקובץ.");
        //}
    }
}
