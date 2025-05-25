using DevNote.Core.Models.files;
using DevNote.Core.Repositories;
using Microsoft.EntityFrameworkCore;
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

        public IEnumerable<Meeting> GetByCreator(string creatorMail)
        {
            var user = _context.Users.FirstOrDefault(u => u.Mail == creatorMail);
            var meetings = _context.Meetings.Where(m => m.CreatorId == user.Id);
            return meetings;
        }

        public int GetCountByCreator(string creatorMail)
        {
            var user = _context.Users.FirstOrDefault(u => u.Mail == creatorMail);
            var meetings = _context.Meetings.Where(m => m.CreatorId == user.Id);
            return meetings.Count();
        }

        public int GetCountNotViewd(string creatorMail)
        {
            var user = _context.Users.FirstOrDefault(u => u.Mail == creatorMail);
            var meetings = _context.Meetings.Where(m => m.CreatorId == user.Id && !m.IsViewed);
            return meetings.Count();
        }

        public Meeting GetById(int id)
        {
            var meeting = _context.Meetings.Include(m => m.Participants).FirstOrDefault(m => m.Id == id);
            if (meeting != null && !meeting.IsViewed)
            {
                meeting.IsViewed = true;
                _context.SaveChanges();
            }
            return meeting;

        }

        public IEnumerable<Meeting> GetLastMonth(DateTime startDate, DateTime endDate, string companyName)
        {
            var userIds = _context.Users
    .Where(u => u.CompanyName.ToLower() == companyName.ToLower().Trim())
    .Select(u => u.Id)
    .ToList();

            var meetings = _context.Meetings
                .Where(m => userIds.Contains(m.CreatorId) &&
                            m.OccurredIn >= startDate &&
                            m.OccurredIn < endDate)
                .ToList();
            return meetings;

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
