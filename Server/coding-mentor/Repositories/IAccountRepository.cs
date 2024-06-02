using coding_mentor.Models;
using coding_mentor.ViewModels;

namespace coding_mentor.Repositories
{
    public interface IAccountRepository
    {
        Task<bool> AddUserAsync(RegisterInput userModel, IEmailSender emailSender);

        Task<User> IsExist(string email);

        Task SaveResetTokenAsync(int userId, string token);

        Task<string> GetResetTokenByEmailAsync(string email);

        Task<bool> ResetPasswordAsync(string email, string newPassword);

        Task<bool> ValidatePasswordResetTokenAsync(string email, string token);

    }
}