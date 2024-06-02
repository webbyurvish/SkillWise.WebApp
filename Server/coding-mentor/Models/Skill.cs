using System.ComponentModel.DataAnnotations;

namespace coding_mentor.Models
{
    public class Skill
    {
            public int Id { get; set; }
            public string Name { get; set; }
            public ICollection<MentorSkill> MentorSkills { get; set; } 
    }
}
