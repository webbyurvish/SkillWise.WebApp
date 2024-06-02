using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace coding_mentor.Models
{
    public class Like
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public int MentorId { get; set; }

        public Mentor Mentor { get; set; }

        public DateTime DateLiked { get; set; }

    }
}
