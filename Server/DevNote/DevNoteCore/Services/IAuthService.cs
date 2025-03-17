using DevNote.Core.Dto_s;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Services
{
    public interface IAuthService
    {
        //Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto);
        //Task<AuthResponseDto> LoginAsync(LoginDto loginDto);

        string GenerateJwtToken(string username, string[] roles);
    }
}
