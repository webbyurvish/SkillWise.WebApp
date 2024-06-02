using coding_mentor.Models;

namespace coding_mentor.Repositories
{
    public interface ILikeRepository
    {
        void AddLikeAsync(Like like);
        Task<bool> IsLikedAsync(int mentorid, int userid);

        Task RemoveLikeAsync(int mentorid, int userid);

    }
}