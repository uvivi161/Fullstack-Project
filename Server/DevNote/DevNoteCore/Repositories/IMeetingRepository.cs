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
        IEnumerable<Meeting> GetByCreator(string creatorMail);
        int GetCountByCreator(string creatorMail);
        int GetCountNotViewd(string creatorMail);
        //IEnumerable<Meeting> GetFiveMeetings(string companyName);
        Meeting GetById(int id);
        IEnumerable<Meeting> GetLastMonth(DateTime startDate, DateTime endDate, string companyName);
        void PostNewMeeting(Meeting meet);
        void Delete(Meeting meet);
    }
}
