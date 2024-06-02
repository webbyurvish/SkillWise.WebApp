namespace coding_mentor.ViewModels
{
    public class ResetPasswordInput
    {
        public string email { get; set; }
        public string token { get; set; }
        public string newPassword { get; set; }
    }
}
