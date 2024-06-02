using Auth0.ManagementApi.Models;
using coding_mentor.Data;
using coding_mentor.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace coding_mentor.SignalR
{
    public class ChatHub : Hub
    {
        private readonly CodingDbContext _codingDbContext;

        public ChatHub(CodingDbContext codingDbContext)
        {
            _codingDbContext = codingDbContext;
        }

        public async Task SendMessage(int userId, string message)
        {
            var user = await _codingDbContext.Users.FindAsync(userId);

            var chatMessage = new GroupMessage { User = user, MessageContent = message };
            _codingDbContext.Add(chatMessage);
            await _codingDbContext.SaveChangesAsync();

            var response = new
            {
                User = user.Name,
                UserId = user.Id,
                ImageUrl = user.ImageUrl,
                Message = chatMessage.MessageContent,
                SentAt = chatMessage.SentAt
            };

            await Clients.All.SendAsync("ReceiveMessage", response);
        }

        public async override Task OnConnectedAsync()
        {
            var messages = _codingDbContext.GroupMessages
             .Include(gm => gm.User)
             .ToList();
            foreach (var message in messages)
            {
                var response = new
                {
                    User = message.User.Name,
                    UserId = message.UserId,
                    ImageUrl = message.User.ImageUrl,
                    Message = message.MessageContent,
                    SentAt = message.SentAt
                };
                await Clients.Caller.SendAsync("ReceiveMessage", response);
            }

            await base.OnConnectedAsync();
        }
    }
}
