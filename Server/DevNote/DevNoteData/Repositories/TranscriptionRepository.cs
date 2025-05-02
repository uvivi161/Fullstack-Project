using DevNote.Core.Models;
using DevNote.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Data.Repositories
{
    public class TranscriptionRepository : ITranscriptionRepository
    {
        private readonly DataContext _context;

        public TranscriptionRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> SaveTranscriptionAsync(Transcription transcription)
        {
            _context.Transcriptions.Add(transcription);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
