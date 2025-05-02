using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Models
{
    public class Transcription
    {
        //public int Id { get; set; }
        //public int FileId { get; set; }
        //public FileUpload File { get; set; } = null!;
        //public string TranscribedText { get; set; } = string.Empty;
        //public DateTime TranscribedAt { get; set; } = DateTime.UtcNow;
        public int Id { get; set; }
        public string UserId { get; set; }
        public string OriginalFileUrl { get; set; }
        public string TranscriptionPdfUrl { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
} 