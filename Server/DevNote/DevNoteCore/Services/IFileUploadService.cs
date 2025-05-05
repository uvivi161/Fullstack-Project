using DevNote.Core.Models.files;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Services
{
    public interface IFileUploadService
    {
        //Task<string> UploadFileAsync(IFormFile file);
        bool PostNewFile(FileUpload fi);
    }
}



