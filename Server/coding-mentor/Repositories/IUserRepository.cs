using Auth0.ManagementApi.Models;
using coding_mentor.Dtos;
using coding_mentor.ViewModels;

namespace coding_mentor.Repositories
{
    public interface IUserRepository
    {
        Task<UserDto> GetUserByIdAsync(int id);
        Task<bool> IsExistUser(int userid);
        Task<List<UserDto>> GetUsersByIdAsync(int[] userIds);
        Task UpdateImageAsync(ChangeImage imageInput, string ImageUrl);
        Task<UserDto> GetUserByEmailAsync(string email);
        Task<List<UserDto>> GetAllUsersAsync();
    }
}