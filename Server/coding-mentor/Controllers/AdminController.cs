using coding_mentor.Repositories;
using coding_mentor.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace coding_mentor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IMentorsRepository _mentorsRepository;
        private readonly IEmailSender _emailSender;

        public AdminController(IMentorsRepository mentorsRepository, IEmailSender emailSender)
        {
            _mentorsRepository = mentorsRepository;
            _emailSender = emailSender;
        }

        // Get all user requests to become a mentor
        [HttpGet("requests")]
        public async Task<IActionResult> GetMentorsRequests()
        {
            try
            {
                // Retrieve all user requests
                var requests = await _mentorsRepository.GetMentorRequestsAsync();
                return Ok(requests);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing the request." });
            }
        }

        // Approve user's request to become a mentor
        [Authorize(Roles = "admin")]
        [HttpPut("approve")]
        public async Task<IActionResult> ApproveRequest([FromBody] string email)
        {
            try
            {
                // Approve mentor request (set 'approved' field in mentor table to true, default is false) 
                var result = await _mentorsRepository.ApproveMentorRequestAsync(email);

                // If request is approved
                if (result)
                {
                    // Create success mail message
                    var successMail = new EmailMessage
                    {
                        To = email,
                        Subject = "Accepting Mentors Request",
                        Content = "Congratulations! You are approved as a mentor."
                    };

                    // Send mail to mentor
                    await _emailSender.SendEmailAsync(email, successMail.Subject, successMail.Content);

                    // Return success message
                    return Ok(new { message = "Mentor Approved Successfully" });
                }

                // Return bad request
                return BadRequest(new { message = "Something went wrong." });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing the request." });
            }
        }

        // Reject user's request
        [Authorize(Roles = "admin")]
        [HttpDelete("reject")]
        public async Task<IActionResult> RejectRequest([FromBody] RejectRequest rejectModel)
        {
            try
            {
                // Delete user from mentor's table
                await _mentorsRepository.DeleteMentorRequestAsync(rejectModel.email);

                // Create reject mail message
                var email = new EmailMessage
                {
                    To = rejectModel.email,
                    Subject = "Rejecting Mentors Request",
                    Content = $"{rejectModel.rejectmessage}"
                };

                // Send mail to user with reject message
                await _emailSender.SendEmailAsync(rejectModel.email, email.Subject, email.Content);

                // Return success message
                return Ok(new { message = "Request rejected successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing the request." });
            }
        }
    }
}
