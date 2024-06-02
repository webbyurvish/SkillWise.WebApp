using System.ComponentModel.DataAnnotations;

namespace coding_mentor.Models
{
    public class GroupMessage
    {
        public int Id { get; set; }
        public int UserId { get; set; }  // Foreign key for User table
        public User User { get; set; }   // Navigation property for User table
        public string MessageContent { get; set; }
        public DateTime SentAt { get; set; }

    }
}
