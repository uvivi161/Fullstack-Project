using DevNote.Core.Dto_s;
using DevNote.Core.Models;
using DevNote.Core.Models.graph;
using DevNote.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using DevNote.Core.Repositories;

namespace DevNote.Data.Repositories
{
    public class UserStatisticsRepository : IUserStatisticsRepository
    {
        private readonly DataContext _context;

        public UserStatisticsRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<User>> GetUsersAsync(int? year = null, string? country = null)
        {
            var query = _context.Users.AsQueryable();

            // החלת פילטרים אופציונליים
            if (year.HasValue)
            {
                query = query.Where(u => u.CreatedAt.Year == year.Value);
            }

            if (!string.IsNullOrEmpty(country))
            {
                query = query.Where(u => u.country == country);
            }

            return await query.ToListAsync();
        }

        public async Task<List<graphDto>> GetUserStatisticsRawDataAsync(int? year = null, string? country = null)
        {
            var query = _context.Users.AsQueryable();

            // החלת פילטרים אופציונליים
            if (year.HasValue)
            {
                query = query.Where(u => u.CreatedAt.Year == year.Value);
            }

            if (!string.IsNullOrEmpty(country))
            {
                query = query.Where(u => u.country == country);
            }

            // המרה ל-DTO
            return await query
                .Select(u => new graphDto
                {
                    Id = u.Id,
                    country = u.country,
                    CreatedAt = u.CreatedAt
                })
                .ToListAsync();
        }

        public async Task<int> GetTotalUsersCountAsync(int? year = null, string? country = null)
        {
            var query = _context.Users.AsQueryable();

            // החלת פילטרים אופציונליים
            if (year.HasValue)
            {
                query = query.Where(u => u.CreatedAt.Year == year.Value);
            }

            if (!string.IsNullOrEmpty(country))
            {
                query = query.Where(u => u.country == country);
            }

            return await query.CountAsync();
        }

        public async Task<IEnumerable<CountryYearStatistic>> GetUserStatisticsByCitiesAndYearsAsync(int? fromYear = null, int? toYear = null)
        {
            var query = _context.Users
                .Where(u => u.country != null) // ודא שיש עיר
                .AsQueryable();

            // סינון לפי טווח שנים אם סופק
            if (fromYear.HasValue)
            {
                query = query.Where(u => u.CreatedAt.Year >= fromYear.Value);
            }

            if (toYear.HasValue)
            {
                query = query.Where(u => u.CreatedAt.Year <= toYear.Value);
            }

            // קיבוץ לפי עיר ושנה וספירת המשתמשים
            var result = await query
                .GroupBy(u => new { u.country, Year = u.CreatedAt.Year })
                .Select(g => new CountryYearStatistic
                {
                    Country = g.Key.country,
                    Year = g.Key.Year,
                    UserCount = g.Count()
                })
                .OrderBy(s => s.Country)
                .ThenBy(s => s.Year)
                .ToListAsync();

            return result;
        }


    }
}
