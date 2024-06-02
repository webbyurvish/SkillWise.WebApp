using Auth0.ManagementApi.Models;
using coding_mentor.Data;
using coding_mentor.Models;
using coding_mentor.SignalR;
using coding_mentor.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading.Tasks;
using static coding_mentor.SignalR.PrivateChatHub;

namespace coding_mentor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrivateMessagesController : ControllerBase
    {
        private readonly IHubContext<PrivateChatHub> _privatehubContext;
        private readonly CodingDbContext _codingDbContext;
        private readonly ConcurrentDictionary<string, string> connectedUsers = ConnectedUsersManager.ConnectedUsers;


        public PrivateMessagesController(IHubContext<PrivateChatHub> privatehubContext, CodingDbContext codingDbContext)
        {
            _privatehubContext = privatehubContext;
            _codingDbContext = codingDbContext;
        }

        [HttpGet("{senderId}/{recipientId}")]
        public async Task<IActionResult> GetPrivateMessages(int senderId, int recipientId)
        {
            var messages = await _codingDbContext.PrivateMessages
                .Include(m => m.Sender)
                .Include(m => m.Recipient)
                .Where(m => (m.SenderId == senderId && m.RecipientId == recipientId)
                    || (m.SenderId == recipientId && m.RecipientId == senderId))
                .OrderBy(m => m.SentAt)
                .ToListAsync();

            var response = messages.Select(message => new
            {
                SenderId = message.Sender.Id,
                SenderName = message.Sender.Name,
                RecipientId = message.Recipient.Id,
                RecipientName = message.Recipient.Name,
                Message = message.MessageContent,
                SentAt = message.SentAt,
                Seen = message.Seen,
            });

            return Ok(response);
        }

        [HttpGet("{senderId}")]
        public async Task<IActionResult> GetChatList(int senderId)
        {
            var users = await _codingDbContext.PrivateMessages.Include(m => m.Sender)
                .Include(m => m.Recipient)
                .Where(m => (m.SenderId == senderId) || (m.RecipientId == senderId))
                .Select(u => new ChatUserList
                {
                    Id = u.RecipientId,
                    Name = u.Recipient.Name,
                    ImageUrl = u.Recipient.ImageUrl,
                    Email = u.Recipient.Email,
                    LastMessage = u.Recipient.ReceivedPrivateMessages.Where(m => m.SenderId == senderId || m.RecipientId == senderId)
                                                                 .OrderByDescending(m => m.SentAt)
                                                                 .Select(m => m.MessageContent)
                                                                 .FirstOrDefault(),

                }).Distinct().ToListAsync();

            return Ok(users);
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] PrivateMessageRequest request)
        {
            var sender = await _codingDbContext.Users.FindAsync(request.SenderId);
            var receiver = await _codingDbContext.Users.FindAsync(request.RecipientId);

            var message = new PrivateMessage
            {
                SenderId = request.SenderId,
                RecipientId = request.RecipientId,
                MessageContent = request.Message,
                SentAt = DateTime.UtcNow,
                Sender = sender,
                Recipient = receiver,
            };

            _codingDbContext.PrivateMessages.Add(message);
            await _codingDbContext.SaveChangesAsync();

            var response = new
            {
                SenderId = message.Sender.Id,
                SenderName = message.Sender.Name,
                RecipientId = message.Recipient.Id,
                RecipientName = message.Recipient.Name,
                Message = message.MessageContent,
                SenderImageUrl = message.Sender.ImageUrl,
                ReceiverImageUrl = message.Recipient.ImageUrl,
                SentAt = message.SentAt,               
            };

            string senderConnectionId;
            connectedUsers.TryGetValue(request.SenderId.ToString(), out senderConnectionId);

            string recipientConnectionId;
            connectedUsers.TryGetValue(request.RecipientId.ToString(), out recipientConnectionId);

            if (!string.IsNullOrEmpty(senderConnectionId))
            {
                await _privatehubContext.Clients.Client(senderConnectionId).SendAsync("ReceivePrivateMessage", response);
            }

            if (!string.IsNullOrEmpty(recipientConnectionId) && recipientConnectionId != senderConnectionId)
            {
                await _privatehubContext.Clients.Client(recipientConnectionId).SendAsync("ReceivePrivateMessage", response);
            }

            return Ok();
        }
    }

        public class PrivateMessageRequest
    {
        public int SenderId { get; set; }
        public int RecipientId { get; set; }
        public string Message { get; set; }
    }
}
