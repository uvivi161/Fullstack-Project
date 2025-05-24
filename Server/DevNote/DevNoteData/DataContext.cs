using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic; 
using System.Linq; 
using System.Text; 
using System.Threading.Tasks;
using DevNote.Core;
using DevNote.Core.Models;
using System.Data;
using DevNote.Core.Models.files;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

namespace DevNote.Data
{ 
    public class DataContext:DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<FileUpload> Files { get; set; }
        public DbSet<Transcription> Transcriptions { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<Permissions> Permissions { get; set; }
        public DbSet<RolePermissions> RolePermissions { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Meeting> Meetings { get; set; } 


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            var connectionString = Environment.GetEnvironmentVariable("DevNote__DB");
            var serverVersion = ServerVersion.AutoDetect(connectionString);
            optionsBuilder.UseMySql(connectionString, serverVersion);
        }
    }
} 
