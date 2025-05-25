using DevNote.Core.Dto_s;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Models.files
{
    public class Meeting
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime OccurredIn { get; set; } = DateTime.UtcNow;//מתי היה המפגש
        public int CreatorId { get; set; }//מי יצר את המפגש
        public string TranscriptionPdfUrl { get; set; }//קישור לקובץ הPDF של התמלול
        public bool IsViewed { get; set; }

        public List<User> Participants { get; set; } = new List<User>();//רשימת המשתתפים במפגש

    }
}
