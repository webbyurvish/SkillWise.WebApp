namespace coding_mentor.ViewModels
{
    public class RatingInput
    {
        public int UserId { get; set; }
        public int MentorId { get; set; }
        public string Comment { get; set; }
        public int stars { get; set; }
        public bool Sentiment { get; set; } // Add this property
    }
}
