using DevNote.Core.Models.files;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Core.Services
{
    public interface IMeetingService
    {
        IEnumerable<Meeting> Get();
        IEnumerable<Meeting> GetByCreator(int creatorId);
        Meeting GetById(int id);
        bool PostNewMeeting(Meeting newMeeting);
        bool Delete(int id);
    }
}
