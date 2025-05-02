using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Dto_s
{
    public class SaveEditedTranscriptDto
    {
        public string EditedText { get; set; }
        public string OriginalFileUrl { get; set; }
        public int UserId { get; set; }
    }
}
