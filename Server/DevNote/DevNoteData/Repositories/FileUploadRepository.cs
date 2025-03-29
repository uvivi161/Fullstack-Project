using DevNote.Core.Models;
using DevNote.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Data.Repositories
{
    public class FileUploadRepository:IFileUploadRepository
    {
        private readonly DataContext _context;
        public FileUploadRepository(DataContext context)
        {
            _context = context;
        }
        public IEnumerable<FileUpload> Get()
        {
            return _context.Files.ToList();
        }
        public void PostNewFile(FileUpload fi)
        {
            _context.Files.Add(fi);
        }
    }

}
