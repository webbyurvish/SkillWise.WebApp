using coding_mentor.Dtos;
using coding_mentor.Models;
using coding_mentor.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace coding_mentor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikeController : ControllerBase
    {
        private readonly ILikeRepository _likeRepository;
        private readonly IMentorsRepository _mentorsRepository;
        private readonly IUserRepository _userRepository;

        public LikeController(ILikeRepository likeRepository, IMentorsRepository mentorsRepository, IUserRepository userRepository)
        {
            _likeRepository = likeRepository;
            _mentorsRepository = mentorsRepository;
            _userRepository = userRepository;
        }

        // Add a like to a mentor
        [Authorize(Roles = "user, mentor, admin")]
        [HttpPost]
        public async Task<IActionResult> AddLike([FromBody] LikeDto likeDto)
        {
            try
            {
                // Check if the user exists
                var userExists = await _userRepository.IsExistUser(likeDto.UserId);
                // Check if the mentor exists
                var mentorExists = await _mentorsRepository.IsExist(likeDto.MentorId);

                // If either the user or mentor does not exist, return bad request
                if (!userExists || !mentorExists)
                {
                    return BadRequest(new { message = "User or mentor not found." });
                }

                // Check if the user has already liked the mentor
                var isLiked = await _likeRepository.IsLikedAsync(likeDto.MentorId, likeDto.UserId);

                // If the user has already liked the mentor, remove the like
                if (isLiked)
                {
                    await _likeRepository.RemoveLikeAsync(likeDto.MentorId, likeDto.UserId);

                    return Ok("Like removed");
                }

                // If the user has not liked the mentor, add a like
                var like = new Like
                {
                    UserId = likeDto.UserId,
                    MentorId = likeDto.MentorId,
                    DateLiked = DateTime.Now
                };

                _likeRepository.AddLikeAsync(like);

                // Return success message
                return Ok(new { message = "Like added successfully." });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing the request." });
            }
        }
    }
}
