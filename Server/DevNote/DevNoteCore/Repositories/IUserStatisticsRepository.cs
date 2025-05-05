using DevNote.Core.Dto_s;
using DevNote.Core.Models;
using DevNote.Core.Models.graph;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Repositories
{
    public interface IUserStatisticsRepository
    {
        Task<List<User>> GetUsersAsync(int? year = null, string? country = null);
        Task<List<graphDto>> GetUserStatisticsRawDataAsync(int? year = null, string? country = null);
        Task<int> GetTotalUsersCountAsync(int? year = null, string? country = null);
        Task<IEnumerable<CountryYearStatistic>> GetUserStatisticsByCitiesAndYearsAsync(int? fromYear = null, int? toYear = null);
    }
}
