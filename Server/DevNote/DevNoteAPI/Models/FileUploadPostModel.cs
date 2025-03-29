namespace DevNote.API.Models
{
    public class FileUploadPostModel
    {
        public string FileName { get; set; } = string.Empty;
        public string FileUrl { get; set; } = string.Empty; // Amazon S3 URL
        public int UserId { get; set; }
        public string S3Key { get; set; }
    }
}
