using System.ComponentModel.DataAnnotations;

namespace coding_mentor.ViewModels
{
    public class ChangePasswordInput
    {
        public string Email { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }

}
