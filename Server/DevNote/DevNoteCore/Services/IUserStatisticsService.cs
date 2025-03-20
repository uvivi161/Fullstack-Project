using DevNote.Core.Dto_s;
using DevNote.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Services
{
    public interface IUserStatisticsService
    {
        Task<List<CountryYearStatistic>> GetUserStatisticsByCountryAndYearAsync(int? year = null, string? country = null);
        Task<CountryStatisticsSummary> GetUserStatisticsForGraphAsync(int? year = null, string? country = null);
        Task<List<graphDto>> GetRawUserStatisticsAsync(int? year = null, string? country = null);
        Task<IEnumerable<CityYearlyStatisticsDto>> GetUserStatisticsByCitiesAndYearsAsync(int? fromYear = null, int? toYear = null);
    }
}
