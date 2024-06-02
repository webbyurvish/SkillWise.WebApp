using coding_mentor.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace coding_mentor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly IMentorsRepository _mentorsRepository;

        public DataController(IMentorsRepository mentorsRepository)
        {
            _mentorsRepository = mentorsRepository;
        }

        // Get all countries from the countries database
        [HttpGet("countries")]
        public async Task<IActionResult> GetCountries()
        {
            try
            {
                var countries = await _mentorsRepository.GetCountriesAsync();

                // Return all countries
                return Ok(countries);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing the request." });
            }
        }

        // Get all languages from the database
        [HttpGet("languages")]
        public async Task<IActionResult> GetLanguages()
        {
            try
            {
                var languages = await _mentorsRepository.GetLanguagesAsync();

                // Return all languages
                return Ok(languages);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing the request." });
            }
        }

        // Get all skills from the database
        [HttpGet("skills")]
        public async Task<IActionResult> GetSkills()
        {
            try
            {
                var skills = await _mentorsRepository.GetSkillsAsync();

                // Return all skills
                return Ok(skills);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing the request." });
            }
        }
    }
}
