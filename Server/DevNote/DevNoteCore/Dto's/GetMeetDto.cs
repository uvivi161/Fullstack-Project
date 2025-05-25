using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Dto_s
{
    public class GetMeetDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime OccurredIn { get; set; }//מתי היה המפגש
        public string TranscriptionPdfUrl { get; set; }
        public int CreatorId { get; set; }//מי יצר את המפגש
        public List<UserMeeting_mailDto> Participants { get; set; } = new List<UserMeeting_mailDto>();
    }
}
