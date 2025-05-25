using DevNote.Core.Models;
using DevNote.Core.Repositories;
using DevNote.Core.Services;
using DevNote.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Service
{
    public class CompanyService : ICompanyService
    {
        private readonly ICompanyRepository _ICompanyRepository;
        private readonly IRepositoryManager _irm;
        public CompanyService(ICompanyRepository ICompanyRepository, IRepositoryManager irm)
        {
            _ICompanyRepository = ICompanyRepository;
            _irm = irm;
        }

        public Company Get(int id)
        {
            return _ICompanyRepository.Get(id);
        }

        public Company GetByName(string name)
        {
            return _ICompanyRepository.GetByName(name);
        }
    }
}
