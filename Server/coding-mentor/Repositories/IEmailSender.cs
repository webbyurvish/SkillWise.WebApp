namespace coding_mentor.Repositories
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}