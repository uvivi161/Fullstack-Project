using DevNote.Core;
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
    public class FileUploadService:IFileUploadService
    {
        private readonly IFileUploadRepository _IFileUploadRepository;
        private readonly IRepositoryManager _irm;


        public FileUploadService(IFileUploadRepository IfileUploadRepository, IRepositoryManager irm)
        {
            _IFileUploadRepository = IfileUploadRepository;
            _irm = irm;
        }

        public bool PostNewFile(FileUpload fi)
        {
            FileUpload file = _IFileUploadRepository.Get().FirstOrDefault(f => f.Id.Equals(fi.Id));
            if(file == null)
            {
                _IFileUploadRepository.PostNewFile(fi);
                _irm.save();
                return true;
            }
            return false;
        }
    }
}
