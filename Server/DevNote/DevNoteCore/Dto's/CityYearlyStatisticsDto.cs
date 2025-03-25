using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Dto_s
{
    public class CityYearlyStatisticsDto
    {
        public string City { get; set; }
        public Dictionary<int, int> YearlyUserCounts { get; set; }
    }
}
