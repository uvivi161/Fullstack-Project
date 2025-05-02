using DevNote.Core.Models;
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
        bool PostNewMeeting(Meeting newMeeting);
    }
}
