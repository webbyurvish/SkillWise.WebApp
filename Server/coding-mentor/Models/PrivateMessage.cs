namespace coding_mentor.Models
{
    public class PrivateMessage
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public int RecipientId { get; set; }
        public string MessageContent { get; set; }
        public DateTime SentAt { get; set; }
        public bool Seen { get; set; } = false;
        // Navigation properties
        public User Sender { get; set; }
        public User Recipient { get; set; }

    }   
}
