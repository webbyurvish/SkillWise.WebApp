using System.ComponentModel.DataAnnotations;

namespace coding_mentor.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string? PasswordHash { get; set; }
        public string? ResetToken { get; set; }
        public DateTime created_at { get; set; }
        public string ImageUrl { get; set; }
        public string Role { get; set; }
        public ICollection<Like> Likes { get; set; }
        public ICollection<Rating> Ratings { get; set; }
        public ICollection<GroupMessage> GroupMessages { get; set; } // Navigation property to the GroupMessage entity
        public ICollection<PrivateMessage> SentPrivateMessages { get; set; }
        public ICollection<PrivateMessage> ReceivedPrivateMessages { get; set; }
    }

}   
