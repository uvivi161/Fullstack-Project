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

        //[HttpPost("login")]
        //public IActionResult Login([FromBody] LoginModel model)
        //{
        //    // כאן יש לבדוק את שם המשתמש והסיסמה מול מסד הנתונים
        //    if (model.UserName == "admin" && model.Password == "admin123")
        //    {
        //        var token = _authService.GenerateJwtToken(model.UserName, new[] { "Admin" });
        //        return Ok(new { Token = token });
        //    }
        //    else if (model.UserName == "editor" && model.Password == "editor123")
        //    {
        //        var token = _authService.GenerateJwtToken(model.UserName, new[] { "Editor" });
        //        return Ok(new { Token = token });
        //    }
        //    else if (model.UserName == "viewer" && model.Password == "viewer123")
        //    {
        //        var token = _authService.GenerateJwtToken(model.UserName, new[] { "Viewer" });
        //        return Ok(new { Token = token });
        //    }

        //    return Unauthorized();
        //}

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            // שליפת המשתמש מה-DB לפי שם משתמש
            var user = _userService.GetByMail(model.Mail);

            // אם המשתמש לא קיים או שהסיסמה לא תואמת
            if (user == null || user.PasswordHash != model.Password)
            {
                return Unauthorized("שם משתמש או סיסמה שגויים");
            }

            // יצירת ה-JWT עם התפקיד של המשתמש מה-DB
            var token = _authService.GenerateJwtToken(user.Role, new[] { user.Role });
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
                country = model.Country
            };
            _userService.PostNewUser(user);
            // יצירת ה-JWT עם התפקיד של המשתמש
            var token = _authService.GenerateJwtToken(user.Role, new[] { user.Role });
            return Ok(new { Token = token });
        }
    }
}
