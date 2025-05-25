
using AutoMapper;
using DevNote.API.Models;
using DevNote.Core;
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
        private readonly IPasswordGenerator _passwordGenerator;
        private readonly ICompanyService _companyService;

        public UsersController(IUserService context, IMapper mapper, IPasswordGenerator passwordGenerator, ICompanyService companyService)
        {
            _userService = context;
            _mapper = mapper;
            _passwordGenerator = passwordGenerator;
            _companyService = companyService;
        }

        //מחזיר רשימת לקוחות
        // GET: api/<UsersController>
        [HttpGet("getAllUser-admin")]
        //[Authorize(Policy = "AdminOnly")]
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


        [HttpGet("getByID")]
        public async Task<string> GetByID(int id)
        {
            return await _userService.GetByIDAsync(id);
        }

        //שליפת המשתמשים שהתחברו בחודש האחרון
        [HttpGet("getLastMonth")]
        public ActionResult GetLastMonth()
        {
            return Ok(_userService.GetLastMonth());
        }


        //שליפת לקוח לפי mail
        // GET api/<UsersController>/5
        [HttpGet("getByMail-admin")]
        //[Authorize(Policy = "AdminOnly")]
        public ActionResult GetByMail(string mail)
        {
            var user = _userService.GetByMail(mail);
            var userDto = _mapper.Map<UserDto>(user);
            if (user == null)
                return NotFound("name is not found:(");
            return Ok(userDto);

        }

        //שליפת כל  המפגשים של לקוח מסוים
        [HttpGet("getAllMeetings")]
        public async Task<ActionResult> GetAllMeetingsAsync(int id)
        {
            var meetings = await _userService.GetAllMeetingsAsync(id);
            var meetingDto = new List<MeetingDto>();
            foreach (var meeting in meetings)
            {
                meetingDto.Add(_mapper.Map<MeetingDto>(meeting));
            }
            return Ok(meetingDto);
        }

        [HttpGet("getByCompanyName")]
        public ActionResult GetByCompany(string company)
        { 
            var users = _userService.GetByCompany(company);
            var usersDtos = new List<UserDto>();
            foreach(var user in users)
            {
                usersDtos.Add(_mapper.Map<UserDto>(user));
            }
            return Ok(usersDtos);
        }

        [HttpGet("getCountByCompanyName")]
        public int GetCountByCompanyName(string companyName)
        {
            return _userService.GetCountByCompany(companyName);
        }

        [HttpPost]
        public async Task<IActionResult> RegisterEmployeeAsync([FromBody] RegisterEmployeeDto dto)
        {
            var generatedPassword = _passwordGenerator.GenerateUniquePassword();
            var company = _companyService.GetByName(dto.CompanyName);
            var user = new User { Mail = dto.Mail, Country = dto.City, CompanyName = dto.CompanyName, Role = dto.Role, PasswordHash = generatedPassword, Company = company };
            var checkUser = _userService.GetByMail(user.Mail);
            // בדיקה האם קיים משתמש עם אותו מייל
            if (checkUser != null)
            {
                return BadRequest("משתמש עם שם משתמש זה כבר קיים");
            }
            var result = await _userService.PostNewUserAsync(user);
            if (!result)
                return BadRequest(true);
            return Ok(false);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserUpdateDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.UpdateUserAsync(id, model);

            if (result)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpDelete("deleteUser-admin")]
        //[Authorize(Policy = "AdminOnly")]
        public ActionResult Delete(int id)
        {
            if (_userService.Delete(id))
                return Ok();
            return NotFound("this user is not exist");
        }


    }
}
