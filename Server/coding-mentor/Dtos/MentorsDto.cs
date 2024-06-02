using coding_mentor.Models;

namespace coding_mentor.Dtos
{
    public class MentorsDto
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string Name { get; set; }

        public string Title { get; set; }

        public string Email { get; set; }

        public List<string> Languages { get; set; }

        public string Country { get; set; }

        public List<string> Skills { get; set; }

        public bool Available { get; set; }

        public bool IsApproved { get; set; }

        public string About { get; set; }

        public string ImageUrl { get; set; }

        public List<int> Likes { get; set; }

        public List<RatingDto> Ratings { get; set; }

    }
}
