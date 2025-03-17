using DevNote.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core
{
    public interface IRepositoryManager
    {
        IUserRepository Users { get; }
        void save();
    }
}
