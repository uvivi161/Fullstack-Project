namespace DevNote.API.Models
{
    public class FileUploadPostModel
    {
        public string FileName { get; set; } = string.Empty;
        public string FileUrl { get; set; } = string.Empty; // לינק ל-S3
        public int UserId { get; set; } // ייתכן שיגיע מה-JWT ולא כחלק מהבקשה
    }
}
