﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "user"; // Admin/User
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public List<FileUpload> Files { get; set; } = new();
    }
}
