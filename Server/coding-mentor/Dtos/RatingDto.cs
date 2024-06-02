using coding_mentor.Models;

namespace coding_mentor.Dtos
{
    public class RatingDto
    {
        public int UserId { get; set; }

        public string Comment { get; set; }

        public int Stars { get; set; }

        public User user { get; set; }

        public DateTime DateRated { get; set; }
    }
}
