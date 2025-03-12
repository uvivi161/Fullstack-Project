using DevNote.Core.Dto_s;
using DevNote.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<UserDto?> GetUserByIdAsync(int id);
        Task<UserDto?> GetUserByEmailAsync(string email);
        Task<bool> RegisterUserAsync(RegisterDto registerDto);
        Task<AuthResponseDto?> AuthenticateUserAsync(LoginDto loginDto);
    }
}
