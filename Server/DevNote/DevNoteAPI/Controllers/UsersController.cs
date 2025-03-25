
using AutoMapper;
using DevNote.API.Models;
using DevNote.Core.Dto_s;
using DevNote.Core.Models;
using DevNote.Core.Services;
using DevNote.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DevNote.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public UsersController(IUserService context, IMapper mapper)
        {
            _userService = context;
            _mapper = mapper;
        }

        //מחזיר רשימת לקוחות
        // GET: api/<UsersController>
        [HttpGet("getAllUser-admin")]
        [Authorize(Policy = "AdminOnly")]
        public ActionResult<User> Get()
        {
            var list = _userService.Get();
            var listDto = new List<UserDto>();
            foreach (var user in list)
            {
                listDto.Add(_mapper.Map<UserDto>(user));
            }
            return Ok(listDto);
        }


        //שליפת לקוח לפי mail
        // GET api/<UsersController>/5
        [HttpGet("getByMail-admin")]
        [Authorize(Policy = "AdminOnly")]
        public ActionResult GetByMail(string mail)
        {
            var user = _userService.GetByMail(mail);
            var userDto = _mapper.Map<UserDto>(user);
            if (user == null)
                return NotFound("name is not found:(");
            return Ok(userDto);

        }

        //הוספת לקוח
        // POST api/<UsersController>
        [HttpPost]
        public ActionResult PostNewUser([FromBody] UserPostModel us)
        {
            var user = new User {Email = us.Email,CreatedAt=new DateTime() ,PasswordHash = us.Password,Role = us.Role};
            if (_userService.PostNewUser(user))
                return Ok();
            return NotFound("this business is already exist");
        }

        //עדכון פרטי לקוח מסוים לפי קוד לקוח
        // PUT api/<UsersController>/5
        [HttpPut("updateUser/{id}")]
        public ActionResult Put(int id, [FromBody] UserPostModel us)
        {
            var user = new User { Email = us.Email, PasswordHash = us.Password, Role= us.Role};
            if (_userService.Put(id, user))
                return Ok();
            return NotFound($"this user {id} is not exist");
        }

        [HttpDelete("deleteUser-admin")]
        [Authorize(Policy = "AdminOnly")]
        public ActionResult Delete(int id)
        {
            if (_userService.Delete(id))
                return Ok();
            return NotFound("this user is not exist");
        }


    }
}
