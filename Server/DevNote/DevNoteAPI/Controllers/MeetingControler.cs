using AutoMapper;
using DevNote.API.Models;
using DevNote.Core.Dto_s;
using DevNote.Core.Models;
using DevNote.Core.Models.files;
using DevNote.Core.Repositories;
using DevNote.Core.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DevNote.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeetingControler : ControllerBase
    {
        private readonly IMeetingService _meetingService;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepo;

        public MeetingControler(IMeetingService context, IMapper mapper,IUserRepository userRepository)
        {
            _meetingService = context;
            _mapper = mapper;
            _userRepo = userRepository;
        }


        //לדעתי לא צריך כי אין צורך בשליפת כל המפגשים כולם
        //// GET: api/<MeetingControler>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    var list
        //}


        [HttpGet("getCountByCreatorId")]//קבלת כמות פגישות שמשתמש יצר לפי המייל שלו
        public int GetCountByCreatorId(string creatorMail)
        {
            return _meetingService.GetCountByCreator(creatorMail);
        }

        //קבלת כמות שעדין לא נצפו
        [HttpGet("getCountNotViewd")]
        public int GetCountNotViewd(string creatorMail)
        {
            return _meetingService.GetCountNotViewd(creatorMail);
        }

        //שליפת כל המפגשים לפי מי שיצר אותם
        //GET api/<MeetingControler>/5
        [HttpGet("getByCreatorId")]
        public ActionResult GetByCreatorId(string creatorMail)
        {
            var meetings = _meetingService.GetByCreator(creatorMail);
            var meetingDto = new List<MeetingDto>();
            foreach (var meeting in meetings)
            {
                meetingDto.Add(_mapper.Map<MeetingDto>(meeting));
            }
            if (!meetings.Any())
                return NotFound("this creatorId is not found");
            return Ok(meetingDto);
        }

        [HttpGet("getById")]//לקבל פרטים של מפגש מסוים לפי ID  
        public ActionResult GetById(int id)
        {
            var meeting = _meetingService.GetById(id);
            if (meeting == null)
                return NotFound("this meeting is not found");
            var meetingDto = new GetMeetDto
            {
                Id = meeting.Id,
                Title = meeting.Title,
                OccurredIn = meeting.OccurredIn,
                TranscriptionPdfUrl = meeting.TranscriptionPdfUrl,
                CreatorId = meeting.CreatorId,
                IsViewed = meeting.IsViewed,
                Participants = meeting.Participants.Select(p => new UserMeeting_mailDto { Mail = p.Mail }).ToList()
            };
            return Ok(meetingDto);
        }

        [HttpGet("getLastMonth")]//מפגשים שנוצרו בחודש האחרון
        public ActionResult GetLastMonth(string companyName)
        {
            return Ok(_meetingService.GetLastMonth(companyName));
        }

        [HttpPost]
        public async Task<ActionResult> PostNewMeeting([FromBody] MeetingPostModel meet)
        {
            var mails = meet.Participants.Select(p => p.Mail).ToList();
            var users = await _userRepo.GetByMailsAsync(mails);

            var meeting = new Meeting
            {
                CreatorId = meet.CreatorId,
                OccurredIn = DateTime.UtcNow,
                Title = meet.Title,
                TranscriptionPdfUrl = meet.TranscriptionPdfUrl,
                IsViewed = false,
                Participants = users
            };

            bool created = await _meetingService.PostNewMeeting(meeting); // הוספת await

            if (created)
                return Ok();

            return NotFound("this meeting already exists");
        }


        // DELETE api/<MeetingControler>/5
        [HttpDelete("deleteMeeting")]
        public ActionResult Delete(int id)
        {
            if (_meetingService.Delete(id))
                return Ok();
            return NotFound($"this meeting {id} is not exist");
        }
    }
}
