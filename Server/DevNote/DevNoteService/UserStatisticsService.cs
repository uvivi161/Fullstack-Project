using DevNote.Core.Dto_s;
using DevNote.Core.Models;
using DevNote.Core.Repositories;
using DevNote.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Service
{
    public class UserStatisticsService :IUserStatisticsService
    {
        private readonly IUserStatisticsRepository _repository;

        public UserStatisticsService(IUserStatisticsRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<CountryYearStatistic>> GetUserStatisticsByCountryAndYearAsync(int? year = null, string? country = null)
        {
            var users = await _repository.GetUsersAsync(year, country);

            // קיבוץ התוצאות לפי מדינה ושנה
            var statistics = users
                .GroupBy(u => new { Country = u.country, Year = u.CreatedAt.Year })
                .Select(g => new CountryYearStatistic
                {
                    Country = g.Key.Country,
                    Year = g.Key.Year,
                    UserCount = g.Count()
                })
                .OrderBy(x => x.Country)
                .ThenBy(x => x.Year)
                .ToList();

            return statistics;
        }

        public async Task<CountryStatisticsSummary> GetUserStatisticsForGraphAsync(int? year = null, string? country = null)
        {
            var users = await _repository.GetUsersAsync(year, country);
            var totalUsers = users.Count;

            // יצירת אובייקט עם סיכום לפי מדינות ושנים לטובת גרפים
            var countrySummary = users
                .GroupBy(u => u.country)
                .Select(g => new CountryStatistics
                {
                    Country = g.Key,
                    TotalUsers = g.Count(),
                    YearlyData = g.GroupBy(u => u.CreatedAt.Year)
                                  .Select(y => new YearlyData
                                  {
                                      Year = y.Key,
                                      Count = y.Count()
                                  })
                                  .OrderBy(y => y.Year)
                                  .ToList()
                })
                .OrderByDescending(x => x.TotalUsers)
                .ToList();

            return new CountryStatisticsSummary
            {
                TotalUsers = totalUsers,
                CountriesData = countrySummary
            };
        }

        public async Task<List<graphDto>> GetRawUserStatisticsAsync(int? year = null, string? country = null)
        {
            return await _repository.GetUserStatisticsRawDataAsync(year, country);
        }

        public async Task<IEnumerable<CityYearlyStatisticsDto>> GetUserStatisticsByCitiesAndYearsAsync(int? fromYear = null, int? toYear = null)
        {
            // קבלת הנתונים הגולמיים מהרפוזיטורי
            var rawData = await _repository.GetUserStatisticsByCitiesAndYearsAsync(fromYear, toYear);

            // עיבוד הנתונים למבנה הרצוי
            var result = rawData
                .GroupBy(data => data.Country)
                .Select(cityGroup => new CityYearlyStatisticsDto
                {
                    City = cityGroup.Key,
                    YearlyUserCounts = cityGroup
                        .ToDictionary(item => item.Year, item => item.UserCount)
                })
                .ToList();

            return result;
        }
    }
}
