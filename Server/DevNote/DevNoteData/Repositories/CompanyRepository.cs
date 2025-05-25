using DevNote.Core.Models;
using DevNote.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Data.Repositories
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly DataContext _context;
        public CompanyRepository(DataContext context)
        {
            _context = context;
        }
        public Company Get(int id)
        {
            return _context.Companys.FirstOrDefault(c => c.Id == id);
        }

        public Company GetByName(string name)
        {
            var company = _context.Companys.FirstOrDefault(c => c.Name == name);
            return company;
        }
    }
}
