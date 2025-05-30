using DevNote.Core.Models;
using DevNote.Core.Services;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace DevNote.Service
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _emailSettings;

        public EmailService(IOptions<EmailSettings> emailSettings)
        {
            _emailSettings = emailSettings.Value;
        }

        //public async Task SendEmailAsync(string toEmail, string subject, string body)
        //{
        //    var mail = new MailMessage();
        //    mail.From = new MailAddress(_emailSettings.SenderEmail, _emailSettings.SenderName);
        //    mail.To.Add(toEmail);
        //    mail.Subject = subject;
        //    mail.Body = body;
        //    mail.IsBodyHtml = false;

        //    using var smtp = new SmtpClient(_emailSettings.SmtpServer, _emailSettings.SmtpPort)
        //    {
        //        Credentials = new NetworkCredential(_emailSettings.SenderEmail, _emailSettings.SenderPassword),
        //        EnableSsl = true
        //    };

        //    await smtp.SendMailAsync(mail);
        //}


        public async Task SendEmailAsync(string toEmail, string subject, string body, bool isHtml = false)
        {
            var mail = new MailMessage
            {
                From = new MailAddress(_emailSettings.SenderEmail, _emailSettings.SenderName),
                Subject = subject,
                Body = body,
                IsBodyHtml = isHtml
            };

            mail.To.Add(toEmail);

            using var smtp = new SmtpClient(_emailSettings.SmtpServer, _emailSettings.SmtpPort)
            {
                Credentials = new NetworkCredential(_emailSettings.SenderEmail, _emailSettings.SenderPassword),
                EnableSsl = true
            };

            await smtp.SendMailAsync(mail);
        }

    }

}
