using coding_mentor.Data;
using coding_mentor.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading.Tasks;

namespace coding_mentor.SignalR
{
    public class PrivateChatHub : Hub
    {
        private readonly CodingDbContext _codingDbContext;
        private readonly ConcurrentDictionary<string, string> connectedUsers = ConnectedUsersManager.ConnectedUsers;

        public PrivateChatHub(CodingDbContext codingDbContext)
        {
            _codingDbContext = codingDbContext;
        }

        public static class ConnectedUsersManager
        {
            public static readonly ConcurrentDictionary<string, string> ConnectedUsers = new ConcurrentDictionary<string, string>();
        }

        public override async Task OnConnectedAsync()
        {
            var senderId = Context.GetHttpContext().Request.Query["senderId"].ToString();
            var recipientId = Context.GetHttpContext().Request.Query["recipientId"].ToString();
            var sender = await _codingDbContext.Users.FirstOrDefaultAsync(s => s.Id.ToString() == senderId);
            var receiver = await _codingDbContext.Users.FirstOrDefaultAsync(r => r.Id.ToString() == recipientId);

            string senderUserId = senderId;
            connectedUsers.TryAdd(senderUserId, Context.ConnectionId);

            string recipientUserId = recipientId;
            connectedUsers.TryAdd(recipientUserId, Context.ConnectionId);

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            string userId = Context.GetHttpContext().Request.Query["senderId"].ToString();
            connectedUsers.TryRemove(userId, out _);

            await base.OnDisconnectedAsync(exception);
        }
    }
}
