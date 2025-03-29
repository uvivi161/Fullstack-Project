using DevNote.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DevNote.Core.Services;
using DevNote.Core.Repositories;
using DevNote.Core.Dto_s;
using DevNote.Core.Models;
using DevNote.Core;

namespace DevNote.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _IUserRepository;
        private readonly IRepositoryManager _irm;

        public UserService(IUserRepository IuserRepository, IRepositoryManager irm)
        {
            _IUserRepository = IuserRepository;
            _irm = irm;
        }

        public IEnumerable<User> Get()
        {
            return _IUserRepository.Get();
        }

        public User GetByMail(string mail)
        {
            return _IUserRepository.GetByMail(mail);
        }
        public IEnumerable<User> GetByCompany(string company)
        {
            return _IUserRepository.GetByCompany(company);
        }

        public bool PostNewUser(User us)
        {
            User u = _IUserRepository.Get().FirstOrDefault(f => f.Id.Equals(us.Id));
            if (u == null)
            {
                _IUserRepository.PostNewUser(us);
                _irm.save();
                return true;
            }
            return false;
        }

        public bool Put(int id, User us)
        {
            User u = _IUserRepository.Get().FirstOrDefault(f => f.Id == id);
            if (u != null)
            {
                _IUserRepository.Put(u, us);
                _irm.save();
                return true;
            }
            return false;
        }

        public bool Delete(int id)
        {
            var user = _IUserRepository.Get().FirstOrDefault(f => f.Id == id);
            if (user == null)
                return false;

            _IUserRepository.Delete(user);
            _irm.save();
            return true;
        }

      

    }
}
