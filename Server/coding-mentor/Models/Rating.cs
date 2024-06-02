namespace coding_mentor.Models
{
    public class Rating
    {
        public int Id { get; set; }
        public int UserId { get; set; } // Foreign key to the User table
        public int MentorId { get; set; } // Foreign key to the Mentor table
        public int Stars { get; set; }
        public string Comment { get; set; }
        public DateTime DateRated { get; set; }
        public bool Sentiment { get; set; } // Add the Sentiment field

        public User User { get; set; } // Navigation property to the User entity
        public Mentor Mentor { get; set; } // Navigation property to the Mentor entity
    }
}
