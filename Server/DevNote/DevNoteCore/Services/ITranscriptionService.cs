using DevNote.Core.Dto_s;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Services
{
    public interface ITranscriptionService
    {
        Task<TranscriptionResultDto> TranscribeAndSaveAsync(TranscriptionDto request);
        //Task<TranscriptionDto> TranscribeAndUploadAsync(string fileUrl, int userId);
        Task<string> SaveEditedTranscriptAsync(SaveEditedTranscriptDto dto);

    }
}
