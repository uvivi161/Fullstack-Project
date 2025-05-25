using DevNote.Core.Dto_s;
using DevNote.Core.Models;
using DevNote.Core.Models.files;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Services
{
    public interface IUserService
    {
        IEnumerable<User> Get();
        User GetByMail(string mail);
        Task<string> GetByIDAsync(int id);
        int GetLastMonth();
        IEnumerable<User> GetByCompany(string company);
        Task<IEnumerable<Meeting>> GetAllMeetingsAsync(int id);
        int GetCountByCompany(string companyName);
        Task<bool> PostNewUserAsync(User us);
        bool RegisterEmployee(string mail, string role, string city, string companyName, out string generatedPassword);
        bool PostNewAdmin(User us);
        Task<bool> UpdateUserAsync(int id, UserUpdateDto model);

        //bool Put(int id, User us);
        bool Delete(int id);

    }
}
