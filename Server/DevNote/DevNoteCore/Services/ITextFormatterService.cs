﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Services
{
    public interface ITextFormatterService
    {
        Task<string> FormatTranscriptAsync(string rawText);
    }
}
