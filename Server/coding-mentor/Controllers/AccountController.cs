using coding_mentor.Repositories;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using User = coding_mentor.Models.User;
using coding_mentor.services;
using Microsoft.AspNetCore.Authorization;
using coding_mentor.ViewModels;
using System.Security.Cryptography;

namespace coding_mentor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IMentorsRepository _mentorsRepository;
        private readonly IEmailSender _emailSender;
        private readonly ICloudinaryService _cloudinaryService;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public AccountController(IAccountRepository accountRepository,
                                 IMentorsRepository mentorsRepository,
                                 IEmailSender emailSender,
                                 ICloudinaryService cloudinaryService,
                                 IConfiguration configuration,
                                 IWebHostEnvironment webHostEnvironment)
        {
            _accountRepository = accountRepository;
            _mentorsRepository = mentorsRepository;
            _emailSender = emailSender;
            _cloudinaryService = cloudinaryService;
            _configuration = configuration;
            _webHostEnvironment = webHostEnvironment;
        }

        // User Register Request

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] RegisterInput userModel,
                                                  [FromServices] IEmailSender emailSender)
        {
            try
            {
                // Check if the user already exists
                var existingUser = await _accountRepository.IsExist(userModel.Email);

                // If the user already exists
                if (existingUser != null)
                {
                    return StatusCode(422, new { Message = "User already exists, please login." });
                }

                // Check if an image file is provided
                if (userModel.ImageFile == null)
                {
                    return BadRequest(new { message = "Image file is required." });
                }

                // Check if the provided file is an image
                if (!userModel.ImageFile.ContentType.StartsWith("image/"))
                {
                    return BadRequest(new { message = "Please upload an image file." });
                }

                // Upload image to Cloudinary
                var folder = "images/";
                userModel.ImageUrl = await _cloudinaryService.UploadImageAsync(userModel.ImageFile, folder);

                // Add the user and receive a boolean result
                var result = await _accountRepository.AddUserAsync(userModel, emailSender);

                // If the user is not added
                if (!result)
                {
                    throw new Exception("Internal server error.");
                }

                // Get the user from the database
                var user = await _accountRepository.IsExist(userModel.Email);

                // Generate JWT token
                var token = GenerateJwtToken(user);

                // Return the token as a response (the token includes user data: id, name, imageurl, role, created_at)
                return Ok(new LoginResponse { token = token });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing the request." });

            }
        }

        // User login request
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginInput loginRequest)
        {
            try
            {
                // Check if the user exists (get user from the database)
                var user = await _accountRepository.IsExist(loginRequest.Email);

                // If the user does not exist
                if (user == null)
                {
                    return Unauthorized(new { message = "User is not registered." });
                }

                // Verify the password
                if (user != null && VerifyPassword(loginRequest.Password, user.PasswordHash))
                {
                    // Generate JWT token
                    var token = GenerateJwtToken(user);

                    // Return the token as a response (the token includes user data: id, name, imageurl, role, created_at)
                    return Ok(new LoginResponse { token = token });

                }

                // In case of invalid credentials
                return Unauthorized(new { message = "Invalid credentials." });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while logging in.");
            }
        }

        // Forgot password request
        [HttpPost("forgotpassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] string email)
        {
            try
            {
                // Get the user from the database
                var user = await _accountRepository.IsExist(email);

                // If the user does not exist
                if (user == null)
                {
                    return NotFound(new { message = "User does not exist." });
                }

                // Generate a password reset token
                var token = GeneratePasswordResetToken();

                // Create the callback URL to send in the email
                // (when clicked, the user will be redirected to the reset password page to enter a new password)
                var callbackUrl = $"http://localhost:3000/forgotpassword?email={email}&token={WebUtility.UrlEncode(token)}";

                // Save the reset password token for the user in the database
                await _accountRepository.SaveResetTokenAsync(user.Id, token);

                // Create the email message
                var message = new EmailMessage
                {
                    To = user.Email,
                    Subject = "Password Reset Request",
                    Content = $"<p>Please click the following link to reset your password:</p><p><a href=\"{callbackUrl}\">{callbackUrl}</a></p>"
                };

                // Send the email to the user with the subject and callback URL
                await _emailSender.SendEmailAsync(email, message.Subject, message.Content);

                // Return a success message
                return Ok(new { message = "Password reset email sent." });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing the request." });
            }

        }

        // Reset password request
        [HttpPost("resetpassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordInput resetPasswordReq)
        {
            try
            {
                // Validate the reset password token received in the request
                var isValidToken = await _accountRepository.ValidatePasswordResetTokenAsync(resetPasswordReq.email, resetPasswordReq.token);

                // If the token is not valid, return bad request
                if (!isValidToken)
                {
                    return BadRequest(new { message = "Please send the request after some time." });
                }

                // Check if the user exists
                var user = await _accountRepository.IsExist(resetPasswordReq.email);

                // If the user does not exist, return not found
                if (user == null)
                {
                    return NotFound(new { message = "User not found." });
                }

                // If the user exists, change the old password with the new password
                var result = await _accountRepository.ResetPasswordAsync(resetPasswordReq.email, resetPasswordReq.newPassword);

                // If the password is not changed, return bad request
                if (!result)
                {
                    return BadRequest(new
                    {
                        message = "Failed to reset password."
                    });
                }

                // Return a success response
                return Ok(new { message = "Password reset successful." });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing the request." });
            }

        }

        // Change password request
        [Authorize(Roles = "mentor, user, admin")]
        [HttpPost("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordInput request)
        {
            try
            {
                // Retrieve the user from the database based on the provided email
                var user = await _accountRepository.IsExist(request.Email);

                // If the user does not exist, return not found
                if (user == null)
                {
                    return NotFound(new { message = "User not found." });
                }

                // Verify the input old password with the hashed password stored in the database
                var passwordCorrect = VerifyPassword(request.OldPassword, user.PasswordHash);

                // If the passwords do not match, return bad request
                if (!passwordCorrect)
                {
                    return BadRequest(new { message = "Invalid old password." });
                }

                // If the old password is correct, change it to the new password
                var result = await _accountRepository.ResetPasswordAsync(request.Email, request.NewPassword);

                // If the password is not changed, return bad request
                if (!result)
                {
                    return BadRequest(new { message = "Failed to reset password." });
                }

                // Return a success message
                return Ok(new { message = "Password changed successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing the request." });
            }
        }

        // Generate JWT token
        private string GenerateJwtToken(User user)
        {
            // Create a list of claims
            var claims = new List<Claim>
            {
                new Claim("id", user.Id.ToString()),
                new Claim("email", user.Email),
                new Claim("name", user.Name),
                new Claim("imageUrl", user.ImageUrl),
                new Claim("role", user.Role),
                new Claim("created_at", user.created_at.ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.UtcNow.AddHours(1);

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Method to convert a simple password to a hashed password
        public static string HashPassword(string password)
        {
            // Generate a random salt
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            // Hash the password with PBKDF2
            var hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            // Combine the salt and hashed password
            return $"{Convert.ToBase64String(salt)}:{hashed}";
        }

        // Verify a password by comparing the hashed password with the input
        public static bool VerifyPassword(string password, string hashedPassword)
        {
            // Split the salt and hashed password
            var parts = hashedPassword.Split(':');
            var salt = Convert.FromBase64String(parts[0]);
            var storedHash = Convert.FromBase64String(parts[1]);

            // Hash the password with the same salt
            var hashToVerify = KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8);

            // Compare the stored hash with the computed hash
            return storedHash.SequenceEqual(hashToVerify);
        }

        // Generate a password reset token
        private string GeneratePasswordResetToken()
        {
            var randomBytes = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomBytes);
            }

            return Convert.ToBase64String(randomBytes);
        }
    }
}
