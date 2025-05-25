using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core
{
    public interface IPasswordGenerator
    {
        string GenerateUniquePassword(int length = 10);
    }
}
