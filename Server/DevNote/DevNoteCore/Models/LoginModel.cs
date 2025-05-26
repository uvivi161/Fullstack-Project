using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Models
{
    public class LoginModel
    {
        public string Password { get; set; }    
        public string Mail { get; set; }
        public string SystemContext { get; set; } // ערכים אפשריים: "admin" או "employee"

    }
}
