using coding_mentor.Models;
using Microsoft.EntityFrameworkCore;
using User = coding_mentor.Models.User;

namespace coding_mentor.Data
{
    public class CodingDbContext : DbContext
    {
        public CodingDbContext(DbContextOptions<CodingDbContext> options) : base(options)
        {

        }

        // Define database tables as DbSet properties
        public DbSet<User> Users { get; set; }
        public DbSet<Mentor> Mentors { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<MentorSkill> MentorSkills { get; set; }
        public DbSet<MentorLanguage> MentorLanguages { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<GroupMessage> GroupMessages { get; set; }
        public DbSet<PrivateMessage> PrivateMessages { get; set; }




        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure relationships between entities

            modelBuilder.Entity<Mentor>()
                .HasMany(m => m.Likes)
                .WithOne(l => l.Mentor)
                .HasForeignKey(l => l.MentorId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Rating>()
               .HasOne(r => r.User)
               .WithMany(u => u.Ratings)
               .HasForeignKey(r => r.UserId);

            modelBuilder.Entity<Rating>()
                .HasOne(r => r.Mentor)
                .WithMany(m => m.Ratings)
                .HasForeignKey(r => r.MentorId);

            modelBuilder.Entity<Like>()
               .HasKey(l => new { l.MentorId, l.UserId });

            modelBuilder.Entity<Like>()
                .HasOne(l => l.Mentor)
                .WithMany(m => m.Likes)
                .HasForeignKey(l => l.MentorId);

            modelBuilder.Entity<Like>()
                .HasOne(l => l.User)
                .WithMany(u => u.Likes)
                .HasForeignKey(l => l.UserId);

            modelBuilder.Entity<MentorSkill>()
                .HasKey(ms => new { ms.MentorId, ms.SkillId });

            modelBuilder.Entity<MentorSkill>()
                .HasOne(ms => ms.Mentor)
                .WithMany(m => m.MentorSkills)
                .HasForeignKey(ms => ms.MentorId);

            modelBuilder.Entity<MentorSkill>()
                .HasOne(ms => ms.Skill)
                .WithMany(s => s.MentorSkills)
                .HasForeignKey(ms => ms.SkillId);

            modelBuilder.Entity<MentorLanguage>()
                .HasKey(ml => new { ml.MentorId, ml.LanguageId });

            modelBuilder.Entity<MentorLanguage>()
                .HasOne(ml => ml.Mentor)
                .WithMany(m => m.MentorLanguages)
                .HasForeignKey(ml => ml.MentorId);

            modelBuilder.Entity<MentorLanguage>()
                .HasOne(ml => ml.Language)
                .WithMany(l => l.MentorLanguages)
                .HasForeignKey(ml => ml.LanguageId);

            modelBuilder.Entity<PrivateMessage>()
             .HasOne(pm => pm.Sender)
             .WithMany(u => u.SentPrivateMessages)
             .HasForeignKey(pm => pm.SenderId)
             .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PrivateMessage>()
                .HasOne(pm => pm.Recipient)
                .WithMany(u => u.ReceivedPrivateMessages)
                .HasForeignKey(pm => pm.RecipientId)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<GroupMessage>()
                .HasOne(gm => gm.User)
                .WithMany(u => u.GroupMessages)
                .HasForeignKey(gm => gm.UserId);

        }
    }
}
