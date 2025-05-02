using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Dto_s
{
    public class TranscriptionResultDto
    {
        public bool Success { get; set; }
        public string? ErrorMessage { get; set; }

        public string? TranscriptText { get; set; }
        public string? TranscriptionId { get; set; }
        public string? PdfUrl { get; set; }
        public string? FileUrl { get; set; }
    }
}
