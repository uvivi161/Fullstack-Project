using DevNote.Core.Models;
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
        IEnumerable<User> GetByCompany(string company);
        void PostNewUser(User us);
        void Put(User u, User us);
        void Delete(User u);
    }
}
