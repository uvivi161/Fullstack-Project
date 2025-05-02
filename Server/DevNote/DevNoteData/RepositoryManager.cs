using DevNote.Core;
using DevNote.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Data
{
    public class RepositoryManager:IRepositoryManager
    {
        private readonly DataContext _context;
        public IUserRepository Users { get; }
        public RepositoryManager(DataContext context, IUserRepository users)
        {
            _context = context;
            Users = users;
        }

        public void save()
        {
            
            _context.SaveChanges();
        }
    }
}
