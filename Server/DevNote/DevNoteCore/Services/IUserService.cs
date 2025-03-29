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
        IEnumerable<User> Get();
        User GetByMail(string mail);
        IEnumerable<User> GetByCompany(string company);
        bool PostNewUser(User us);
        bool Put(int id, User us);
        bool Delete(int id);
        
    }
}
