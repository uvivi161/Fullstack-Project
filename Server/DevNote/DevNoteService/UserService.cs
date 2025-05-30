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
using DevNote.Core.Models.files;
using Microsoft.AspNetCore.Identity;

namespace DevNote.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _IUserRepository;
        private readonly IRepositoryManager _irm;
        private readonly IPasswordGenerator _passwordGenerator;
        private readonly IEmailService _emailService;

        public UserService(IUserRepository IuserRepository, IRepositoryManager irm, IPasswordGenerator passwordGenerator, IEmailService emailService)
        {
            _IUserRepository = IuserRepository;
            _irm = irm;
            _passwordGenerator = passwordGenerator;
            _emailService = emailService;
        }

        public IEnumerable<User> Get()
        {
            return _IUserRepository.Get();
        }
        public async Task<string> GetByIDAsync(int id)
        {
            return await _IUserRepository.GetByIDAsync(id);
        }

        public User GetByMail(string mail)
        {
            return _IUserRepository.GetByMail(mail);
        }
        public IEnumerable<User> GetByCompany(string company)
        {
            return _IUserRepository.GetByCompany(company);
        }
        public Task<IEnumerable<Meeting>> GetAllMeetingsAsync(int id)
        {
            return _IUserRepository.GetAllMeetingsAsync(id);
        }
        public int GetLastMonth()
        {
            var now = DateTime.Now;
            return _IUserRepository.GetLastMonth(now.Year, now.Month);
        }
        public int GetCountByCompany(string companyName)
        {
            return _IUserRepository.GetCountByCompany(companyName);
        }

        private string HashPassword(string plainPassword)
        {
            var hasher = new PasswordHasher<User>();
            return hasher.HashPassword(null, plainPassword);
        }

        public async Task<bool> PostNewUserAsync(User us)
        {
            var existingUser = _IUserRepository.Get().FirstOrDefault(f => f.Id == us.Id);
            if (existingUser != null)
                return false;

            var password = us.PasswordHash;
            us.PasswordHash = HashPassword(us.PasswordHash);

            _IUserRepository.PostNewUser(us);
            _irm.save();

            var subject = "Welcome to the DevNote system";
            var body = $@"
        <div style='font-family:Arial,sans-serif; font-size:14px; color:#333;'>
            <p>Hi {us.Mail},</p>
            <p>Your user was created.</p>
            <p>Email: {us.Mail}</p>
            <p>Your Password: {password}</p>
        </div>";

            await _emailService.SendEmailAsync(us.Mail, subject, body, isHtml: true);

            return true;
        }


        public bool RegisterEmployee(string mail, string role, string city, string companyName, out string generatedPassword)
        {
            generatedPassword = _passwordGenerator.GenerateUniquePassword();

            var user = new User
            {
                Mail = mail,
                Role = role,
                Country = city,
                CompanyName = companyName,
                PasswordHash = generatedPassword,
                CreatedAt = DateTime.UtcNow
            };

            User u = _IUserRepository.Get().FirstOrDefault(f => f.Id.Equals(user.Id));
            if (u == null)
            {
                _IUserRepository.PostNewUser(user);
                _irm.save();
                return true;
            }
            return false;
        }

        public bool PostNewAdmin(User user)
        {
            if (user == null) return false;
            user.PasswordHash = HashPassword(user.PasswordHash); // שימי לב – מחייב שימוש בפונקציית הצפנה

            // צור אובייקט חברה חדש
            var company = new Company
            {
                Name = user.CompanyName,
                Country = user.Country,
                Employees = new List<User> { user } // המנהל הוא העובד הראשון
            };

            // קרא לפונקציית הריפוזיטורי
            _IUserRepository.PostNewAdmin(user, company);

            return true;
        }

        public async Task<bool> UpdateUserAsync(int id, UserUpdateDto model)
        {

            // קבלת המשתמש הקיים לפי מזהה
            var existingUser = await _IUserRepository.GetUserByIdAsync(id);
            if (existingUser == null)
            {
                return false;
            }

            // בדיקה אם המייל החדש כבר קיים במערכת (אם הוא שונה מהמייל הנוכחי)
            if (model.Mail != existingUser.Mail)
            {
                bool isEmailUnique = await _IUserRepository.IsEmailUniqueAsync(model.Mail, id);
                if (!isEmailUnique)
                {
                    return false; // המייל כבר קיים במערכת
                }
            }

            // עדכון רק השדות הנדרשים - מייל, עיר ותפקיד
            existingUser.Mail = model.Mail;
            existingUser.Country = model.Country;
            existingUser.Role = model.Role;

            // שמירת השינויים
            bool updated = await _IUserRepository.UpdateUserAsync(id, existingUser);
            if (!updated)
            {
                return false;
            }

            return true;

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
