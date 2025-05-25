using DevNote.Core.Models;
using DevNote.Core.Models.files;
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

        public async Task<string> GetByIDAsync(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            return user?.Mail;
        }
        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public User GetByMail(string Mail)
        {
            var user = _context.Users.FirstOrDefault(f => f.Mail == Mail);

            return user;
        }
        public async Task<List<User>> GetByMailsAsync(List<string> mails)
        {
            return await _context.Users
                .Where(u => mails.Contains(u.Mail))
                .ToListAsync();

        }

        public IEnumerable<User> GetByCompany(string company)
        {
            var users = _context.Users.Where(u => u.CompanyName == company).ToList();
            return users;
        }

        public async Task<IEnumerable<Meeting>> GetAllMeetingsAsync(int id)
        {
            var user = await _context.Users
                .Include(u => u.MeetingList)
                .FirstOrDefaultAsync(u => u.Id == id);
            return user?.MeetingList;

        }
        public int GetLastMonth(int year, int month)
        {
            return _context.Users.
                Count(u => u.CreatedAt.Year == year && u.CreatedAt.Month == month);
        }
        public int GetCountByCompany(string company)
        {
            return _context.Users.Count(u => u.CompanyName == company);
        }
        public void PostNewUser(User us)
        {
            _context.Users.Add(us);
        }

        public void PostNewAdmin(User us, Company company)
        {
            // שמירה של החברה, שתשמור גם את המנהל כעובד שלה
            _context.Companys.Add(company);
            _context.SaveChanges();
        }

        //public void Put(User u, User us)
        //{
        //    u.Mail = us.Mail;
        //    u.PasswordHash = us.PasswordHash;
        //    u.Role = us.Role;
        //    u.CompanyName = us.CompanyName;
        //}
        public async Task<bool> UpdateUserAsync(int id, User user)
        {
            try
            {
                // Entity Framework סימון שהאובייקט השתנה
                _context.Entry(user).State = EntityState.Modified;

                // שמירת השינויים
                var result = await _context.SaveChangesAsync();
                return result > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> IsEmailUniqueAsync(string email, int excludeUserId)
        {
            // בדיקה אם קיים מייל זהה למשתמש אחר
            return !await _context.Users
                .AnyAsync(u => u.Mail == email && u.Id != excludeUserId);
        }
        public void Update(User user)
        {
            // אם ה-User הגיע מתוך ה-DbContext אין צורך לעשות Update
            // אך אם לא, אפשר לעשות:
            _context.Users.Update(user); // אופציונלי בלבד אם יש Tracking
        }

        public void Delete(User u)
        {
            _context.Users.Remove(u);
        }

    }
}
