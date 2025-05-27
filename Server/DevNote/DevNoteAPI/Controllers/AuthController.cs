using DevNote.API.Models;
using DevNote.Core.Dto_s;
using DevNote.Core.Models;
using DevNote.Core.Services;
using DevNote.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DevNote.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserService _userService;

        public AuthController(IAuthService authService, IUserService userService)
        {
            _authService = authService;
            _userService = userService;
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            // שליפת המשתמש מה-DB לפי שם משתמש
            var user = _userService.GetByMail(model.Mail);

            // אם המשתמש לא קיים או שהסיסמה לא תואמת
            if (user == null || !_authService.VerifyPassword(model.Password, user.PasswordHash))
            {
                Console.WriteLine("User not found");
                return Unauthorized("שם משתמש או סיסמה שגויים");
            }
            if (model.SystemContext == "admin" && user.Role != "admin")
            {
                Console.WriteLine("Wrong password");
                return Unauthorized("admin only");
            }
            if (model.SystemContext != "admin" && user.Role == "admin")
            {
                Console.WriteLine("Non-admin tried to access admin");
                return Unauthorized("admin not allowed");
            }

            // יצירת ה-JWT עם התפקיד של המשתמש מה-DB
            var token = _authService.GenerateJwtToken(user.Mail, user.Id, user.Country, user.CompanyName, user.Role);
            return Ok(new { Token = token });
        }


        [HttpPost("register")]
        public IActionResult register([FromBody] UserPostModel model)
        {
            var checkUser = _userService.GetByMail(model.Mail);
            // בדיקה האם קיים משתמש עם אותו מייל
            if (checkUser != null)
            {
                return BadRequest("משתמש עם שם משתמש זה כבר קיים");
            }
            // הוספת המשתמש למסד הנתונים
            var user = new User
            {
                Mail = model.Mail,
                PasswordHash = model.Password,
                Role = model.Role,
                Country = model.Country,
                CompanyName = model.CompanyName
            };
            _userService.PostNewUserAsync(user);
            // יצירת ה-JWT עם התפקיד של המשתמש
            var token = _authService.GenerateJwtToken(user.Mail, user.Id, user.Country, user.CompanyName, user.Role);
            return Ok(new { Token = token });
        }


        [HttpPost("adminRegister")]
        public IActionResult adminRegister([FromBody] UserPostModel model)
        {
            var checkUser = _userService.GetByMail(model.Mail);
            // בדיקה האם קיים משתמש עם אותו מייל
            if (checkUser != null)
            {
                return BadRequest("מנהל עם שם משתמש זה כבר קיים");
            }
            // הוספת המשתמש למסד הנתונים
            var user = new User
            {
                Mail = model.Mail,
                PasswordHash = model.Password,
                Role = model.Role,
                Country = model.Country,
                CompanyName = model.CompanyName
            };
            _userService.PostNewAdmin(user);
            // יצירת ה-JWT עם התפקיד של המשתמש
            var token = _authService.GenerateJwtToken(user.Mail, user.Id, user.Country, user.CompanyName, user.Role);
            return Ok(new { Token = token });
        }

    }
}
