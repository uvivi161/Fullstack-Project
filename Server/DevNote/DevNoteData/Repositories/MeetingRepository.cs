using DevNote.Core.Models;
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

        public void PostNewMeeting(Meeting meet)
        { 
            _context.Meetings.Add(meet);
        }

    }
}
