using DevNote.Core.Models.files;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Repositories
{
    public interface IMeetingRepository
    {
        IEnumerable<Meeting> Get();
        IEnumerable<Meeting> GetByCreator(int creatorId);
        Meeting GetById(int id);
        void PostNewMeeting(Meeting meet);
        void Delete(Meeting meet);
    }
}
