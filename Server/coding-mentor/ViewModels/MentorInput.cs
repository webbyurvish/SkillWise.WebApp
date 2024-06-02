using System.ComponentModel.DataAnnotations;

namespace coding_mentor.ViewModels
{
    public class MentorInput
    {
        public string Email { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public List<int> SkillIds { get; set; }
        [Required]
        public List<int> LanguageIds { get; set; }
        [Required]
        public string Country { get; set; }
        public bool Available { get; set; }
        [Required]
        public string About { get; set; }
    }
}
