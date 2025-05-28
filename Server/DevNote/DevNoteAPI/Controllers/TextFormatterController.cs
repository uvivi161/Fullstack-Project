using DevNote.Core.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DevNote.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TextFormatterController : ControllerBase
    {
        private readonly ITextFormatterService _textFormatterService;

        public TextFormatterController(ITextFormatterService textFormatterService)
        {
            _textFormatterService = textFormatterService;
        }

        [HttpPost("format")]
        public async Task<IActionResult> Format([FromBody] string rawText)
        {
            if (string.IsNullOrWhiteSpace(rawText))
                return BadRequest("Text is required.");

            var formattedText = await _textFormatterService.FormatTranscriptAsync(rawText);
            return Ok(formattedText);
        }
    }


}
