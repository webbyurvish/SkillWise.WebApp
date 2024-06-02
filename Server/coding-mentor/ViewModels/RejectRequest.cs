using System.ComponentModel.DataAnnotations;

namespace coding_mentor.ViewModels
{
    public class RejectRequest
    {
        [Required]
        public string email;

        [Required]
        public string rejectmessage;
    }
}
