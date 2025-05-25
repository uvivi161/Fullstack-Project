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
        bool VerifyPassword(string enteredPassword, string storedHashedPassword);
        string GenerateJwtToken(string email, int id, string city, string companyName, string role);
    }
}
