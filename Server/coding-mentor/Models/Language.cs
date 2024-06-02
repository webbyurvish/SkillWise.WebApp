using System.ComponentModel.DataAnnotations;

namespace coding_mentor.Models
{
    public class Language
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<MentorLanguage> MentorLanguages { get; set; }
    }
}
