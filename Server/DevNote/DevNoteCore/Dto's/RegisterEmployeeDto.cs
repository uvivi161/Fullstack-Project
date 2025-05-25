using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Dto_s
{
    public class RegisterEmployeeDto
    {
        public string Mail { get; set; }
        public string Role { get; set; }
        public string City { get; set; }
        public string CompanyName { get; set; }
    }
}
