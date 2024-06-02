using coding_mentor.Dtos;
using coding_mentor.Models;
using coding_mentor.ViewModels;
using static coding_mentor.Controllers.MentorsController;
using static coding_mentor.Controllers.RatingController;
using static coding_mentor.Repositories.MentorsRepository;

namespace coding_mentor.Repositories
{
    public interface IMentorsRepository
    {
        Task<List<MentorsDto>> GetAllMentors();
        Task<MentorsDto> GetMentorByIdAsync(int id);
        Task<Mentor> GetMentorById(int id);
        Task<bool> DeleteMentorAsync(string email);

        Task<bool> IsExist(int mentorid);
        Task<bool> IsExist(string Email);

        Task<bool> AddMentor(MentorInput mentorInput);
        Task<MentorsDto> GetMentorByEmailAsync(string email);
        Task<bool> IsExistuser(string Email);
        Task<List<Country>> GetCountriesAsync();
        Task<List<SkillDto>> GetSkillsAsync();
        Task<List<LanguageDto>> GetLanguagesAsync();
        Task<bool> UpdateMentorAsync(UpdateMentorInput updateInput);
        Task<List<MentorsRequestDto>> GetMentorRequestsAsync();
        Task DeleteMentorRequestAsync(string email);
        Task<bool> ApproveMentorRequestAsync(string email);
        Task<bool> IsReviewExist(int userId, int mentorId);
        Task AddRatingAsync(RatingInput ratingInput);
        public Task<PaginationResult<MentorsDto>> GetFilteredMentorsAsync(List<MentorsDto> mentors, string technology, string country, string name, string spokenlanguage, int pageNumber, int pageSize , bool isLiked,
                                                                                int userId);    }
}