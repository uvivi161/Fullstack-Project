using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Dto_s
{
    public class MeetingDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime occurredIn { get; set; }//מתי היה המפגש
        public bool IsViewed { get; set; }

    }
}
