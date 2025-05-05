using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Models.graph
{
    public class CountryYearStatistic
    {
        public string Country { get; set; }
        public int Year { get; set; }
        public int UserCount { get; set; }
    }
}
