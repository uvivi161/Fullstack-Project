using DevNote.Core.Models;
using DevNote.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<User> Get()
        {
            return _context.Users.ToList();
        }

        public User GetByMail(string Mail)
        {
            var user = _context.Users.FirstOrDefault(f => f.Mail == Mail);

            return user;
        }

        public IEnumerable<User> GetByCompany(string company)
        {
            var users = _context.Users.Where(u => u.CompanyName == company).ToList();
            return users;
        }

        public void PostNewUser(User us)
        {
            _context.Users.Add(us);
        }

        public void Put(User u, User us)
        {
            u.Mail = us.Mail;
            u.PasswordHash = us.PasswordHash;
            u.Role = us.Role;
            u.CompanyName = us.CompanyName;
        }

        public void Delete(User u)
        {
            _context.Users.Remove(u);
        }

    }
}
