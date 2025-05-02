using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Models
{
    public class Meeting
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime occurredIn { get; set; }//מתי היה המפגש
        public int CreatorId { get; set; }//מי יצר את המפגש
        public List<User> Participants { get; set; } = new List<User>();//רשימת המשתתפים במפגש
    }
}
