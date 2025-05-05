using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Models.files
{
    public class FileUpload
    {
        public int Id { get; set; }
        public string FileName { get; set; } = string.Empty;
        public string FileUrl { get; set; } = string.Empty; // Amazon S3 URL
        public int UserId { get; set; }
        //public User User { get; set; } = null!;
        //public Transcription? Transcription { get; set; }
        public string S3Key { get; set; }
        public DateTime CreatedAt { get; set; }
        //public DateTime UpdatedAt { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
