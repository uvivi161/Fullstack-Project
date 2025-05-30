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
        private string GetEmailFooter()
        {
            return @"
        <hr style='margin:20px 0;' />
        <div style='color: #555; font-size: 14px;'>
          <p style='margin:0; font-weight:bold;'>🎉 DevNote – Your ideas. Structured.</p>
          <p style='margin:4px 0;'>🖥️ A smart platform for meeting transcriptions and insights.</p>
          <p style='margin:4px 0;'>🌐 
            <a href='https://fullstack-project-react.onrender.com/' style='color:#0066cc; text-decoration:none;'>
              www.DevNote.com
            </a>
          </p>
          <p style='margin:4px 0;'>📧 
            <a href='mailto:devNote702@gmail.com?subject=Customer%20Support%20Request&body=Hello%20DevNote%20Team%2C%0A%0AI%20would%20like%20to%20contact%20you%20regarding%20...'
               style='color:#0066cc; text-decoration:none;'>
              support@calendar.co.il
            </a>
          </p>
          <p style='margin:4px 0;'>📞 +1 (234) 567-8900</p>
          <p style='margin-top:10px; font-size:12px; color:#888;'>
            This message was sent from DevNote. We're here to help with any questions.
          </p>
        </div>";
        }

        private string AppendFooterToHtml(string body)
        {
            return $@"
        <div style='font-family:Arial,sans-serif; font-size:14px; color:#333;'>
            {body}
            {GetEmailFooter()}
        </div>";
        }

        public async Task SendEmailAsync(string toEmail, string subject, string body, bool isHtml = false)
        {
            string fullBody = isHtml ? AppendFooterToHtml(body) : body;

            var mail = new MailMessage
            {
                From = new MailAddress(_emailSettings.SenderEmail, _emailSettings.SenderName),
                Subject = subject,
                Body = fullBody,
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
