using DevNote.Core.Models.files;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Repositories
{
    public interface ITranscriptionRepository
    {
        Task<bool> SaveTranscriptionAsync(Transcription transcription);

    }
}
