using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Dto_s
{
    public class TranscriptionDto
    {
        public string FileUrl { get; set; }   // כתובת הקובץ שהועלה ל-S3
        public string S3Key { get; set; }
        public int UserId { get; set; }    // מזהה המשתמש
    }
}
