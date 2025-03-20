using DevNote.Core.Dto_s;
using DevNote.Core.Models;
using DevNote.Core.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DevNote.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserStatisticsController : ControllerBase
    {
        private readonly IUserStatisticsService _statisticsService;
        public UserStatisticsController(IUserStatisticsService userStatisticsService)
        {
            _statisticsService = userStatisticsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserStatistics(
            [FromQuery] int? year = null,
            [FromQuery] string? country = null)
        {
            try
            {
                var statistics = await _statisticsService.GetUserStatisticsByCountryAndYearAsync(year, country);

                // במקרה שאין תוצאות
                if (statistics.Count == 0)
                {
                    return Ok(new { Message = "לא נמצאו נתונים עבור הפרמטרים המבוקשים" });
                }

                return Ok(statistics);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = $"שגיאה בעת אחזור נתוני סטטיסטיקה: {ex.Message}" });
            }
        }

        /// <summary>
        /// גרסה נוספת שמחזירה את הנתונים בפורמט מותאם לגרפים
        /// </summary>
        [HttpGet("graph")]
        public async Task<IActionResult> GetUserStatisticsForGraph(
            [FromQuery] int? year = null,
            [FromQuery] string? country = null)
        {
            try
            {
                var graphData = await _statisticsService.GetUserStatisticsForGraphAsync(year, country);
                return Ok(graphData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = $"שגיאה בעת אחזור נתוני גרף: {ex.Message}" });
            }
        }

        /// <summary>
        /// נקודת קצה נוספת המחזירה מידע גולמי עבור הDTO שהוגדר
        /// </summary>
        [HttpGet("raw")]
        public async Task<IActionResult> GetRawUserStatistics(
            [FromQuery] int? year = null,
            [FromQuery] string? country = null)
        {
            try
            {
                var result = await _statisticsService.GetRawUserStatisticsAsync(year, country);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = $"שגיאה בעת אחזור נתונים גולמיים: {ex.Message}" });
            }
        }


        //[HttpGet("cities-yearly")]
        //public async Task<IActionResult> GetUserStatisticsByCitiesAndYears(
        //[FromQuery] int? fromYear = null,
        //[FromQuery] int? toYear = null)
        //{
        //    try
        //    {
        //        var citiesYearlyData = await _statisticsService.GetUserStatisticsByCitiesAndYearsAsync(fromYear, toYear);

        //        if (citiesYearlyData == null || !citiesYearlyData.Any())
        //        {
        //            return Ok(new { Message = "לא נמצאו נתונים עבור הערים והשנים המבוקשות" });
        //        }

        //        return Ok(citiesYearlyData);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new { Error = $"שגיאה בעת אחזור נתוני משתמשים לפי ערים ושנים: {ex.Message}" });
        //    }
        //}

        [HttpGet("cities-yearly")]
        public async Task<IActionResult> GetUserStatisticsByCitiesAndYears(
            [FromQuery] int? fromYear = null,
            [FromQuery] int? toYear = null)
        {
            try
            {
                var citiesYearlyData = await _statisticsService.GetUserStatisticsByCitiesAndYearsAsync(fromYear, toYear);

                // החזר רשימה ריקה במקום אובייקט עם Message
                return Ok(citiesYearlyData ?? new List<CityYearlyStatisticsDto>());
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = $"שגיאה בעת אחזור נתוני משתמשים לפי ערים ושנים: {ex.Message}" });
            }
        }
    }
}
