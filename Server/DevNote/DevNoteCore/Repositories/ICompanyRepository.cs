using DevNote.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Repositories
{
    public interface ICompanyRepository
    {
        Company Get(int id);
        Company GetByName(string name);
    }
}
