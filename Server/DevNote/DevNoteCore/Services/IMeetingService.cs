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
        IEnumerable<Meeting> GetByCreator(string creatorMail);
        int GetCountByCreator(string creatorMail);
        //IEnumerable<Meeting> GetFiveMeetings(string companyName);
        int GetCountNotViewd(string creatorMail);
        Meeting GetById(int Id);
        IEnumerable<Meeting> GetLastMonth(string companyName);
        Task<bool> PostNewMeeting(Meeting newMeeting);
        bool Delete(int id);
    }
}
