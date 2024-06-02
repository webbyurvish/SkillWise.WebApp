using System.ComponentModel.DataAnnotations;

namespace coding_mentor.Models
{
    public class Mentor
    {   
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Email { get; set; }
        public string Country { get; set; } 
        public bool Available { get; set; }
        public bool IsApproved { get; set; }
        public string About { get; set; }
        public string ImageUrl { get; set; }
        public ICollection<Like>? Likes { get; set; }
        public ICollection<MentorSkill>? MentorSkills { get; set; }
        public ICollection<MentorLanguage>? MentorLanguages { get; set; }
        public ICollection<Rating>? Ratings { get; set; }
    }

    public class MentorSkill
    {
        public int MentorId { get; set; }
        public Mentor Mentor { get; set; }

        public int SkillId { get; set; }
        public Skill Skill { get; set; }
    }

    public class MentorLanguage
    {
        public int MentorId { get; set; }
        public Mentor Mentor { get; set; }

        public int LanguageId { get; set; }
        public Language Language { get; set; }
    }

}
