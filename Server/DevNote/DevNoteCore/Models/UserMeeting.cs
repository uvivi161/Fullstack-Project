using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Models
{
    public class UserMeeting
    {
        public int Id { get; set; }
        public int MeetingId { get; set; }
        public int UserId { get; set; }
    }
}
