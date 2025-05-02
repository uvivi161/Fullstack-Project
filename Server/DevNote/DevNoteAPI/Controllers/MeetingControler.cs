using AutoMapper;
using DevNote.API.Models;
using DevNote.Core.Dto_s;
using DevNote.Core.Models;
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
        public MeetingControler(IMeetingService context, IMapper mapper)
        {
            _meetingService = context;
            _mapper = mapper;
        }


        //לדעתי לא צריך כי אין צורך בשליפת כל המפגשים כולם
        //// GET: api/<MeetingControler>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    var list
        //}



        //שליפת כל המפגשים לפי מי שיצר אותם
         //GET api/<MeetingControler>/5
        [HttpGet("getByCreatorId/{creatorId}")]
        public ActionResult GetByCreatorId(int creatorId)
        {
            var meetings = _meetingService.GetByCreator(creatorId);
            var meetingDto = new List<MeetingDto>();
            foreach (var meeting in meetings) 
            {
                meetingDto.Add(_mapper.Map<MeetingDto>(meeting));
            }
            if (meetings == null)
                return NotFound("this creatorId is not found");
            return Ok(meetingDto);
        }

        // POST api/<MeetingControler>
        [HttpPost]
        public ActionResult PostNewMeeting([FromBody] MeetingPostModel meet)
        {
            var meeting = new Meeting { CreatorId = meet.CreatorId, occurredIn = new DateTime(), Title = meet.title };
            if (_meetingService.PostNewMeeting(meeting)) 
                return Ok(meeting);
            return NotFound("this meeting is already exist");
        }


        //// PUT api/<MeetingControler>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}


        //// DELETE api/<MeetingControler>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
