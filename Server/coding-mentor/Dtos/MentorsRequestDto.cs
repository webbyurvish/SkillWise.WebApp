using coding_mentor.Models;

namespace coding_mentor.Dtos
{
    public class MentorsRequestDto
    {
        public int Id { get; set; }

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
    }
}
