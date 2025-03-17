namespace DevNote.API.Models
{
        public class UserPostModel
        {
            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty; // קלט רגיל, יהפוך ל-Hash בשירות
            public string Role { get; set; } = "user"; // ברירת מחדל - משתמש רגיל
        }
}
