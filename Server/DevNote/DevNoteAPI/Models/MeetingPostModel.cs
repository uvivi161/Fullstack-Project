using DevNote.Core.Models;

namespace DevNote.API.Models
{
    public class MeetingPostModel
    {
        public string title { get; set; }
        public int CreatorId { get; set; }
        public List<UserPostModel> Participants { get; set; } = new List<UserPostModel>();
    }
}
