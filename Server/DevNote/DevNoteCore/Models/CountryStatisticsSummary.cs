using  System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Models
{
    public class CountryStatisticsSummary
    {
        public int TotalUsers { get; set; }
        public List<CountryStatistics> CountriesData { get; set; } = new List<CountryStatistics>();
    }
}
