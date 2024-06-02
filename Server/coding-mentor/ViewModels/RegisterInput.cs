namespace coding_mentor.ViewModels
{
    public class RegisterInput
    {
        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string? ImageUrl { get; set; }

        public IFormFile ImageFile { get; set; }
    }
}
