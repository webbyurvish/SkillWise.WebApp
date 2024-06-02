using coding_mentor.Data;
using coding_mentor.Models;
using coding_mentor.ViewModels;
using Microsoft.EntityFrameworkCore;
using static coding_mentor.Controllers.AccountController;

namespace coding_mentor.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly CodingDbContext _codingDbContext;
        private readonly IEmailSender _emailSender;

        public AccountRepository(CodingDbContext codingDbContext, IEmailSender emailSender)
        {
            _codingDbContext = codingDbContext;
            _emailSender = emailSender;
        }

        // Add user to the database
        public async Task<bool> AddUserAsync(RegisterInput userModel, IEmailSender emailSender)
        {
            var user = new User
            {
                Name = userModel.Name,
                Email = userModel.Email,
                PasswordHash = HashPassword(userModel.Password),
                ImageUrl = userModel.ImageUrl,
                created_at = DateTime.UtcNow,
                Role = "user",
            };

            try
            {
                _codingDbContext.Users.Add(user);
                await _codingDbContext.SaveChangesAsync();

                // Send registration email to the user
                var subject = "Welcome to mentors Web App!";
                var message = $"Hi {userModel.Name},\n\nThank you for registering with us. Your Email is: {userModel.Email} and your password is {userModel.Password}.";

                await _emailSender.SendEmailAsync(userModel.Email, subject, message);

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        // Check if a user with the given email exists
        public async Task<User> IsExist(string email)
        {
            try
            {
                var user = await _codingDbContext.Users.Where(u => u.Email == email).FirstOrDefaultAsync();
                return user;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // Reset the password for the user with the given email
        public async Task<bool> ResetPasswordAsync(string email, string newPassword)
        {
            // Find the user
            var user = await _codingDbContext.Users.Where(u => u.Email == email).FirstOrDefaultAsync();

            // If the user exists, change the password and return true
            if (user != null)
            {
                user.PasswordHash = HashPassword(newPassword);
                user.ResetToken = null; // Clear the reset token after password reset
                _codingDbContext.SaveChanges();
                return true;
            }

            // Otherwise, return false
            return false;
        }

        // Validate the password reset token for the user with the given email
        public async Task<bool> ValidatePasswordResetTokenAsync(string email, string token)
        {
            // Get the stored token from the user table
            var storedToken = await _codingDbContext.Users.Where(u => u.Email == email).Select(u => u.ResetToken).FirstOrDefaultAsync();

            // Validate the token against the stored token
            if (storedToken == token)
            {
                return true;
            }

            return false;
        }

        // Save the password reset token in the database for the user with the given userId
        public async Task SaveResetTokenAsync(int userId, string token)
        {
            var user = await _codingDbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user != null)
            {
                user.ResetToken = token;
                await _codingDbContext.SaveChangesAsync(); // Save changes to the database
            }
        }

        // Get the reset password token for the user with the given email
        public async Task<string> GetResetTokenByEmailAsync(string email)
        {
            var token = await _codingDbContext.Users.Where(u => u.Email == email).Select(u => u.ResetToken).FirstOrDefaultAsync();
            return token;
        }

    }
}
