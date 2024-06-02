using coding_mentor.Data;
using coding_mentor.Models;
using coding_mentor.SignalR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace coding_mentor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _hubContext;
        private readonly CodingDbContext _codingDbContext;

        public MessagesController(IHubContext<ChatHub> hubContext, CodingDbContext codingDbContext)
        {
            _hubContext = hubContext;
            _codingDbContext = codingDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] MessageRequest request)
        {
            var user = await _codingDbContext.Users.FindAsync(request.UserId);
            var message = new GroupMessage { User = user, MessageContent = request.Message, SentAt = DateTime.UtcNow };

            _codingDbContext.Add(message);
            await _codingDbContext.SaveChangesAsync();

              var response = new
            {
                User = user.Name,
                UserId = user.Id,
                ImageUrl = user.ImageUrl,
                Message = message.MessageContent,
                SentAt = message.SentAt
            };

            await _hubContext.Clients.All.SendAsync("ReceiveMessage", response);
            return Ok();
        }
    }

    public class MessageRequest
    {
        public int UserId { get; set; }
        public string Message { get; set; }
    }
}
