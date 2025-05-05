using DevNote.Core.Models.files;
using DevNote.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Data.Repositories
{
    public class MeetingRepository: IMeetingRepository
    {
        private readonly DataContext _context;
        public MeetingRepository(DataContext context)
        {
            _context = context;
        }
        public IEnumerable<Meeting> Get()
        {
            return _context.Meetings.ToList();
        }

        public IEnumerable<Meeting> GetByCreator(int creatorId)
        {
            var meetings = _context.Meetings.Where(m => m.CreatorId == creatorId);
            return meetings;
        }
        public Meeting GetById(int id)
        {
            var meeting = _context.Meetings.FirstOrDefault(m => m.Id == id);
            return meeting;
        }

        public void PostNewMeeting(Meeting meet)
        { 
            _context.Meetings.Add(meet);
        }

        public void Delete(Meeting meet)
        {
            _context.Meetings.Remove(meet);
        }
    }
}
