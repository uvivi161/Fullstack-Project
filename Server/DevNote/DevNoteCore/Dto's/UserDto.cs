using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Dto_s
{
    public class UserDto
    {
        //public string userName { get; set; }
        public int Id { get; set; }
        public string Mail { get; set; }
        public string password { get; set; }
        public string Role { get; set; }
        public string CompanyName { get; set; }
    }
}
