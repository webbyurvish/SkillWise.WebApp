namespace coding_mentor.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime created_at { get; set; }
        public string ImageUrl { get; set; }
        public List<int> Likes { get; set; }
        public string Role { get; set; }
    }
}
