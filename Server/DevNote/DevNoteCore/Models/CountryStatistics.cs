using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Models
{
    public class CountryStatistics
    {
        public string Country { get; set; }
        public int TotalUsers { get; set; }
        public List<YearlyData> YearlyData { get; set; } = new List<YearlyData>();
    }
}
