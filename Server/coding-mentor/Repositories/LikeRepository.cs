using coding_mentor.Data;
using coding_mentor.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace coding_mentor.Repositories
{
    public class LikeRepository : ILikeRepository
    {
        private readonly CodingDbContext _codingDbContext;

        public LikeRepository(CodingDbContext codingDbContext)
        {
            _codingDbContext = codingDbContext;
        }

        // Add a like asynchronously
        public async void AddLikeAsync(Like like)
        {
            await _codingDbContext.Likes.AddAsync(like);
            _codingDbContext.SaveChanges();
        }

        // Check if the user already liked the mentor or not
        public async Task<bool> IsLikedAsync(int mentorId, int userId)
        {
            return await _codingDbContext.Likes.AnyAsync(l => l.UserId == userId && l.MentorId == mentorId);
        }

        // Remove a like asynchronously
        public async Task RemoveLikeAsync(int mentorId, int userId)
        {
            var like = await _codingDbContext.Likes.Where(l => l.UserId == userId && l.MentorId == mentorId).FirstOrDefaultAsync();

            _codingDbContext.Likes.Remove(like);
            await _codingDbContext.SaveChangesAsync();
        }
    }
}
