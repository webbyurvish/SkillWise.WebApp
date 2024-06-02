using System.ComponentModel.DataAnnotations;

namespace coding_mentor.Models
{
    public class MentorRequest
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public bool Available { get; set; }
        public string About { get; set; }
        public ICollection<MentorSkill>? MentorSkills { get; set; }
        public ICollection<MentorLanguage>? MentorLanguages { get; set; }
    }
}
