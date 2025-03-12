using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Models
{
    public class Transcription
    {
        public int Id { get; set; }
        public int FileId { get; set; }
        public FileUpload File { get; set; } = null!;
        public string TranscribedText { get; set; } = string.Empty;
        public DateTime TranscribedAt { get; set; } = DateTime.UtcNow;
    }
} 