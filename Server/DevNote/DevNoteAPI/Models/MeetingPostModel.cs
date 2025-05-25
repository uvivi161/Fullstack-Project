using DevNote.Core.Dto_s;
using DevNote.Core.Models;

namespace DevNote.API.Models
{
    public class MeetingPostModel
    {
        public string Title { get; set; }
        public int CreatorId { get; set; }
        public string TranscriptionPdfUrl { get; set; }//קישור לקובץ הPDF של התמלול
        public List< UserMailPostModel> Participants { get; set; } = new List<UserMailPostModel>();
    }
}
