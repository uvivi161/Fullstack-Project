﻿using DevNote.Core.Dto_s;
using DevNote.Core.Services;
using DevNote.Service;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DevNote.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TranscriptionController : ControllerBase
    {
        private readonly ITranscriptionService _service;

        public TranscriptionController(ITranscriptionService service)
        {
            _service = service;
        }

        [HttpPost("transcribe")]
        public async Task<IActionResult> TranscribeAudio([FromBody] TranscriptionDto request)
        {
            if (request == null)
                Console.WriteLine("Request body is null");

            if (string.IsNullOrEmpty(request.FileUrl))
                Console.WriteLine("FileUrl is missing");

            if (string.IsNullOrEmpty(request.S3Key))
                Console.WriteLine("S3Key is missing");

            if (request.UserId <= 0)
                return BadRequest("UserId is invalid"); if (request == null)
                Console.WriteLine("Request body is null");

            if (string.IsNullOrEmpty(request.FileUrl))
                return BadRequest("FileUrl is missing");

            if (string.IsNullOrEmpty(request.S3Key))
                return BadRequest("S3Key is missing");

            if (request.UserId <= 0)
                return BadRequest("UserId is invalid");
            var result = await _service.TranscribeAndSaveAsync(request);
            if (!result.Success)
                return BadRequest(result.ErrorMessage);

            return Ok(new
            {
                result.TranscriptText,
                result.TranscriptionId,
                result.FileUrl,
                result.PdfUrl
            });
        }


        [HttpPost("save-edited-transcription")]
        public async Task<IActionResult> SaveEditedTranscription([FromBody] SaveEditedTranscriptDto dto)
        {
            Console.WriteLine(dto.EditedText,"edited text");
            var result = await _service.SaveEditedTranscriptAsync(dto);
            if (string.IsNullOrWhiteSpace(result))
                return StatusCode(500, "אירעה שגיאה בשמירת התמלול.");

            return Ok(new { PdfUrl = result });
        }

    }
}
