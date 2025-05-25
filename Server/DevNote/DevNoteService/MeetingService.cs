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
        private readonly IUserService _userService;
        private readonly IEmailService _emailService;

        public MeetingService(IMeetingRepository _meetingRepositoory, IRepositoryManager irm, IUserService userService, IEmailService emailService)
        {
            _IMeetingRepository = _meetingRepositoory;
            _irm = irm;
            _userService = userService;
            _emailService = emailService;
        }

        public IEnumerable<Meeting> Get()
        {
            return _IMeetingRepository.Get();
        }

        public IEnumerable<Meeting> GetByCreator(string creatorMail)
        {
            return _IMeetingRepository.GetByCreator(creatorMail);
        }

        public int GetCountByCreator(string creatorMail)
        {
            return _IMeetingRepository.GetCountByCreator(creatorMail);
        }

        public int GetCountNotViewd(string creatorMail)
        {
            return _IMeetingRepository.GetCountNotViewd(creatorMail);
        }

        public Meeting GetById(int id)
        {
            return _IMeetingRepository.GetById(id);
        }

        public IEnumerable<Meeting> GetLastMonth(string companyName)
        {
            var now = DateTime.UtcNow;
            var startDate = new DateTime(now.Year, now.Month, 1); // תחילת החודש הקודם
            var endDate = new DateTime(now.Year, now.Month, 1).AddMonths(1); // תחילת החודש הנוכחי
            return _IMeetingRepository.GetLastMonth(startDate, endDate, companyName);
        }

        public async Task<bool> PostNewMeeting(Meeting meeting)
        {
            var existing = _IMeetingRepository.Get().FirstOrDefault(m => m.Id.Equals(meeting.Id));
            if (existing != null)
                return false;

            _IMeetingRepository.PostNewMeeting(meeting);
            _irm.save();
            var creatorMail = await _userService.GetByIDAsync(meeting.CreatorId);

            // שליחת מייל לכל המשתתפים
            foreach (var user in meeting.Participants)
            {
                string subject = "You've been added to a new meeting";

                string body = $"Hi,\n\n{creatorMail} has added you to the meeting \n\ntitled \"{meeting.Title}\".\n Date: {meeting.OccurredIn:MMMM dd, yyyy}\n\nYou're welcome to join!\n";
                // קריאה לאסינכרוני בצורה חסרת המתנה – כי הפונקציה היא sync
                _ = _emailService.SendEmailAsync(user.Mail, subject, body);
            }

            return true;
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
