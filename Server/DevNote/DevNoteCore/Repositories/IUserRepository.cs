using DevNote.Core.Models;
using DevNote.Core.Models.files;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Repositories
{
    public interface IUserRepository
    {
        IEnumerable<User> Get();
        User GetByMail(string mail);
        Task<string> GetByIDAsync(int id);
        int GetLastMonth(int year, int month);
        Task<User> GetUserByIdAsync(int id);
        Task<List<User>> GetByMailsAsync(List<string> mails);
        IEnumerable<User> GetByCompany(string company);
        Task<IEnumerable<Meeting>> GetAllMeetingsAsync(int id);
        int GetCountByCompany(string company);
        void PostNewUser(User us);
        void PostNewAdmin(User us, Company company);
        //void Put(User u, User us);
        Task<bool> UpdateUserAsync(int id, User user);
        Task<bool> IsEmailUniqueAsync(string email, int excludeUserId);

        void Delete(User u);
    }
}
