namespace DevNote.API.Models
{
        public class UserPostModel
        {
            public string Mail { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty; // קלט רגיל, יהפוך ל-Hash בשירות
            public string Role { get; set; } = "user"; // ברירת מחדל - משתמש רגיל
            public string Country { get; set; }
            public string CompanyName { get; set; }
    }
}
