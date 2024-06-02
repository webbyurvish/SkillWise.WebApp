using coding_mentor.Repositories;
using coding_mentor.services;
using coding_mentor.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace coding_mentor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ICloudinaryService _cloudinaryService;
        private readonly IMentorsRepository _mentorsRepository;

        public UserController(IUserRepository userRepository ,
                              ICloudinaryService cloudinaryService,
                              IMentorsRepository mentorsRepository)
        {
            _userRepository = userRepository;
            _cloudinaryService = cloudinaryService;
            _mentorsRepository = mentorsRepository;
        }

        // Get users by their IDs
        [HttpGet]
        public async Task<IActionResult> GetUsersById([FromQuery] int[] userIds)
        {
            try
            {
                // Retrieve users by their IDs
                var users = await _userRepository.GetUsersByIdAsync(userIds);

                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing the request." });
            }
        }

        [HttpGet("{email}")]
        public async Task <IActionResult> GetUserByEmail([FromRoute] string email)
        {
            try
            {
                var user = await _userRepository.GetUserByEmailAsync(email);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing the request." });
            }
        }

        [HttpGet("all")]
        public async Task <IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _userRepository.GetAllUsersAsync();
                return Ok(users);

            } catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing the request." });
            }
        }

 

        [Authorize(Roles ="user , mentor")]
        [HttpPut("setImage")]
        public async Task<IActionResult> ChangeProfilePhoto([FromForm] ChangeImage imageInput)
        {
            try
            {
                // Check if an image file is provided
                if (imageInput.ImageFile == null)
                {
                    return BadRequest(new { message = "Image file is required." });
                }

                // Check if the provided file is an image
                if (!imageInput.ImageFile.ContentType.StartsWith("image/"))
                {
                    return BadRequest(new { message = "Please upload an image file." });
                }

                // Upload image to Cloudinary
                var folder = "images/";
                var ImageUrl = await _cloudinaryService.UploadImageAsync(imageInput.ImageFile, folder);

                await _userRepository.UpdateImageAsync(imageInput, ImageUrl);

                return Ok(new { message = "Profile Photo updated successfully", ImageUrl });
            } catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while Updating photo." });
            }
        }
    }
}
