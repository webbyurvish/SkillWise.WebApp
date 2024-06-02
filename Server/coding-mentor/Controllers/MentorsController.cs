using coding_mentor.Repositories;
using coding_mentor.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace coding_mentor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MentorsController : ControllerBase
    {
        private readonly IMentorsRepository _mentorsRepository;
        private readonly IUserRepository _userRepository;

        public MentorsController(IMentorsRepository mentorsRepository, IUserRepository userRepository)
        {
            _mentorsRepository = mentorsRepository;
            _userRepository = userRepository;
        }

        // Add a user's request in the mentor's table with the field isApproved set to false
        [Authorize(Roles = "user")]
        [HttpPost("add")]
        public async Task<IActionResult> AddMentor([FromBody] MentorInput mentorInput)
        {
            try
            {
                // Check if the user exists
                var isUser = await _mentorsRepository.IsExistuser(mentorInput.Email);

                // If the user does not exist, return bad request
                if (!isUser)
                {
                    return BadRequest(new { message = "Please register as a user first." });
                }

                // Check if the mentor already exists in the table
                var isExist = await _mentorsRepository.IsExist(mentorInput.Email);

                // If the mentor already exists in the table, return bad request indicating they have already sent a request
                if (isExist)
                {
                    return BadRequest(new { message = "You have already sent a request." });
                }

                // If the mentor does not exist in the table, add mentor data to the mentor table with isApproved set to false
                var result = await _mentorsRepository.AddMentor(mentorInput);

                // Return the result
                return result ? Ok(new { message = "Request sent successfully." }) : BadRequest(new { message = "Something went wrong." });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing the request." });
            }
        }

        // Get all mentors
        [HttpGet("all")]
        public async Task<IActionResult> GetAllMentors()
        {
            try
            {
                var mentors = await _mentorsRepository.GetAllMentors();
                return Ok(mentors);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        // Get mentor by ID
        [Authorize(Roles = "user, mentor, admin")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMentorById([FromRoute] int id)
        {
            try
            {
                var mentor = await _mentorsRepository.GetMentorByIdAsync(id);
                return Ok(mentor);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing the request." });
            }
        }

        // Get mentor by email
        [Authorize(Roles = "user, mentor, admin")]
        [HttpGet("get/{email}")]
        public async Task<IActionResult> GetMentorByEmail([FromRoute] string email)
        {
            try
            {
                var mentor = await _mentorsRepository.GetMentorByEmailAsync(email);
                return Ok(mentor);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing the request." });
            }
        }

        // Update mentor details
        [Authorize(Roles = "mentor, admin")]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateMentor(UpdateMentorInput updatedMentor)
        {
            try
            {
                var result = await _mentorsRepository.UpdateMentorAsync(updatedMentor);

                if (result)
                {
                    return Ok(new { message = "Updated successfully." });
                }

                throw new Exception("Something went wrong.");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing the request." });
            }
        }

        // Get filtered mentors
        [HttpGet]
        public async Task<IActionResult> GetFilteredMentors(string technology = "", string country = "", string name = "", string spokenlanguage = "",
                                                            int pageNumber = 1, int pageSize = 9, bool isLiked = false, int userId = 1)
        {
            try
            {
                var allMentors = await _mentorsRepository.GetAllMentors();

                var paginationResult = await _mentorsRepository.GetFilteredMentorsAsync(allMentors, technology, country, name, spokenlanguage, pageNumber, pageSize, isLiked, userId);
                return Ok(paginationResult);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // Delete mentor by email
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteMentor([FromBody] string email)
        {
            try
            {
                var result = await _mentorsRepository.DeleteMentorAsync(email);

                if (result)
                {
                    return Ok(new { message = "Mentor deleted successfully." });
                }
                else
                {
                    return BadRequest(new { message = "Something went wrong." });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing the request." });
            }
        }
    }
}
