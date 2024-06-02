using Microsoft.Extensions.Options;
using System.Net.Mail;
using System.Net;

namespace coding_mentor.Repositories
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailSettings _emailSettings;

        public EmailSender(IOptions<EmailSettings> emailSettings)
        {
            _emailSettings = emailSettings.Value;
        }

        // Send an email asynchronously
        public async Task SendEmailAsync(string email, string subject, string message)
        {
            // Configure the SMTP client with email settings
            var smtpClient = new SmtpClient
            {
                Host = _emailSettings.SmtpServer,
                Port = _emailSettings.SmtpPort,
                EnableSsl = true,
                Credentials = new NetworkCredential(_emailSettings.Username, _emailSettings.Password)
            };

            // Create and configure the email message
            using var emailMessage = new MailMessage
            {
                From = new MailAddress(_emailSettings.From),
                Subject = subject,
                Body = message,
                IsBodyHtml = true
            };

            // Add the recipient's email address
            emailMessage.To.Add(email);

            // Send the email using the SMTP client
            await smtpClient.SendMailAsync(emailMessage);
        }
    }
}
