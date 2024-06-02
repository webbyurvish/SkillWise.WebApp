using coding_mentor.Data;
using coding_mentor.Dtos;
using coding_mentor.Models;
using coding_mentor.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace coding_mentor.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly CodingDbContext _codingDbContext;

        public UserRepository(CodingDbContext codingDbContext)
        {
            _codingDbContext = codingDbContext;
        }

        // Get a user by ID
        public async Task<UserDto> GetUserByIdAsync(int id)
        {
            try
            {
                var user = await _codingDbContext.Users
                    .Include(m => m.Likes)
                    .ThenInclude(l => l.Mentor)
                    .Where(m => m.Id == id)
                    .Select(m => new UserDto()
                    {
                        Id = m.Id,
                        Name = m.Name,
                        Email = m.Email,
                        ImageUrl = m.ImageUrl,
                        Likes = m.Likes.Where(l => l.UserId == id).Select(l => l.MentorId).ToList(),
                    })
                    .FirstOrDefaultAsync();

                return user;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // Get multiple users by their IDs
        public async Task<List<UserDto>> GetUsersByIdAsync(int[] userIds)
        {
            try
            {
                var users = await _codingDbContext.Users
                    .Where(u => userIds.Contains(u.Id))
                    .Select(m => new UserDto()
                    {
                        Id = m.Id,
                        Name = m.Name,
                        Email = m.Email,
                        ImageUrl = m.ImageUrl,
                    })
                    .ToListAsync();

                return users;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // Check if a user exists by ID
        public async Task<bool> IsExistUser(int userid)
        {
            return await _codingDbContext.Users.AnyAsync(u => u.Id == userid);
        }

        public async Task UpdateImageAsync(ChangeImage imageInput , string ImageUrl)
        {
            var user = await _codingDbContext.Users.FirstOrDefaultAsync(u => u.Id == imageInput.Id);
            user.ImageUrl = ImageUrl;

            _codingDbContext.Users.Update(user);
            await _codingDbContext.SaveChangesAsync();

        }

        public async Task<UserDto> GetUserByEmailAsync(string email)
        {
            try
            {
                var user = await _codingDbContext.Users
                .Where(u => u.Email == email)
                .Select(u => new UserDto
                {
                    Name = u.Name,
                    Email = u.Email,
                    Id = u.Id,
                    ImageUrl = u.ImageUrl
                })
                .FirstOrDefaultAsync();


                return user;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<UserDto>> GetAllUsersAsync()
        {
            try
            {
                var users = await _codingDbContext.Users
                    .Select(u => new UserDto {
                        Name = u.Name,
                        Email = u.Email,
                        Id = u.Id,
                        ImageUrl = u.ImageUrl,
                        Role = u.Role
                    }).ToListAsync();

                return users;

            }   catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
