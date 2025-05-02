using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Mail { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "user"; // Admin/User
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string country { get; set; }
        public string CompanyName { get; set; }

        List<Meeting> MeetingList { get; set; }= new List<Meeting>();
        public List<FileUpload> Files { get; set; } = new();
    }
}
