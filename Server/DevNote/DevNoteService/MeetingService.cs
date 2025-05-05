using DevNote.Core;
using DevNote.Core.Models.files;
using DevNote.Core.Repositories;
using DevNote.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Service
{
    public class MeetingService : IMeetingService
    {
        private readonly IMeetingRepository _IMeetingRepository;
        private readonly IRepositoryManager _irm;

        public MeetingService(IMeetingRepository _meetingRepositoory, IRepositoryManager irm)
        {
            _IMeetingRepository = _meetingRepositoory;
            _irm = irm;
        }

        public IEnumerable<Meeting> Get()
        {
            return _IMeetingRepository.Get();
        }

        public IEnumerable<Meeting> GetByCreator(int creatorId)
        {
            return _IMeetingRepository.GetByCreator(creatorId);
        }
        
        public Meeting GetById(int id)
        {
            return _IMeetingRepository.GetById(id);
        }

        public bool PostNewMeeting(Meeting meeting)
        {
            Console.WriteLine(meeting.Title);
            Meeting m = _IMeetingRepository.Get().FirstOrDefault(m => m.Id.Equals(meeting.Id));
            if (m == null)
            {
                _IMeetingRepository.PostNewMeeting(meeting);
                _irm.save();
                return true;
            }
            return false;
        }
        public bool Delete(int id)
        {
            var meet = _IMeetingRepository.Get().FirstOrDefault(m => m.Id.Equals(id));
            if (meet == null)
            {
                return false;
            }
            _IMeetingRepository.Delete(meet);
            _irm.save();
            return true;
        }
    }
}
