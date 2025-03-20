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

        public User GetByMail(string email)
        {
            var user = _context.Users.FirstOrDefault(f => f.Email == email);

            return user;
        }

        public void PostNewUser(User us)
        {
            _context.Users.Add(us);
        }

        public void Put(User u, User us)
        {
            u.Email = us.Email;
            u.PasswordHash = us.PasswordHash;
            u.Role = us.Role;
        }

        public void Delete(User u)
        {
            _context.Users.Remove(u);
        }

    }
}
