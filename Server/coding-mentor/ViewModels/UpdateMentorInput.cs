 namespace coding_mentor.ViewModels
{
    public class UpdateMentorInput
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string Email { get; set; }
        public string? Title { get; set; }
        public string? About { get; set; }
        public string? Country { get; set; }
        public List<int>? LanguageIds { get; set; }
        public List<int>? SkillIds { get; set; }
        public bool Available { get; set; }
    }
}
