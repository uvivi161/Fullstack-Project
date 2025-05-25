using DevNote.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Service
{
    public class PasswordGenerator : IPasswordGenerator
    {
        private readonly HashSet<string> _usedPasswords = new();
        private readonly object _lock = new();

        public string GenerateUniquePassword(int length = 10)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
            var random = new Random();
            string password;
            lock (_lock)
            {
                do
                {
                    password = new string(Enumerable.Repeat(chars, length)
                        .Select(s => s[random.Next(s.Length)]).ToArray());
                } while (_usedPasswords.Contains(password));
                _usedPasswords.Add(password);
            }
            return password;
        }
    }
}
