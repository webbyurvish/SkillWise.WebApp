using coding_mentor.Repositories;
using coding_mentor.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace coding_mentor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        private readonly IMentorsRepository _mentorsRepository;

        public RatingController(IMentorsRepository mentorsRepository)
        {
            _mentorsRepository = mentorsRepository;
        }

        // Add rating to a mentor
        [Authorize(Roles = "user, mentor, admin")]
        [HttpPost]
        public async Task<IActionResult> AddRating([FromBody] RatingInput ratingInput)
        {
            try
            {
                // Check if the user has already rated the mentor
                var isRated = await _mentorsRepository.IsReviewExist(ratingInput.UserId, ratingInput.MentorId);

                // If the user has already rated the mentor, return bad request
                if (isRated)
                {
                    return BadRequest(new { message = "You have already rated this mentor." });
                }

                // Add the rating otherwise
                await _mentorsRepository.AddRatingAsync(ratingInput);

                // Return a success message
                return Ok(new { message = "Rating added successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing the request." });
            }
        }
    }
}
