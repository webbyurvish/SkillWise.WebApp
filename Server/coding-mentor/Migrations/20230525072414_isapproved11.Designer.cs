﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using coding_mentor.Data;

#nullable disable

namespace coding_mentor.Migrations
{
    [DbContext(typeof(CodingDbContext))]
    [Migration("20230525072414_isapproved11")]
    partial class isapproved11
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Country", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Countries");
                });

            modelBuilder.Entity("coding_mentor.Models.Language", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Languages");
                });

            modelBuilder.Entity("coding_mentor.Models.Like", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("MentorId")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateLiked")
                        .HasColumnType("datetime2");

                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.HasKey("UserId", "MentorId");

                    b.HasIndex("MentorId");

                    b.ToTable("Likes");
                });

            modelBuilder.Entity("coding_mentor.Models.Mentor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("About")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Available")
                        .HasColumnType("bit");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsApproved")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Mentors");
                });

            modelBuilder.Entity("coding_mentor.Models.MentorLanguage", b =>
                {
                    b.Property<int>("MentorId")
                        .HasColumnType("int");

                    b.Property<int>("LanguageId")
                        .HasColumnType("int");

                    b.HasKey("MentorId", "LanguageId");

                    b.HasIndex("LanguageId");

                    b.ToTable("MentorLanguages");
                });

            modelBuilder.Entity("coding_mentor.Models.MentorSkill", b =>
                {
                    b.Property<int>("MentorId")
                        .HasColumnType("int");

                    b.Property<int>("SkillId")
                        .HasColumnType("int");

                    b.HasKey("MentorId", "SkillId");

                    b.HasIndex("SkillId");

                    b.ToTable("MentorSkills");
                });

            modelBuilder.Entity("coding_mentor.Models.Rating", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Comment")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateRated")
                        .HasColumnType("datetime2");

                    b.Property<int>("Stars")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Ratings");
                });

            modelBuilder.Entity("coding_mentor.Models.Skill", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Skills");
                });

            modelBuilder.Entity("coding_mentor.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ResetToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("created_at")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("coding_mentor.Models.UserRating", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("MentorId")
                        .HasColumnType("int");

                    b.Property<int>("RatingId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "MentorId");

                    b.HasIndex("MentorId");

                    b.HasIndex("RatingId");

                    b.ToTable("UserRatings");
                });

            modelBuilder.Entity("coding_mentor.Models.Like", b =>
                {
                    b.HasOne("coding_mentor.Models.Mentor", "Mentor")
                        .WithMany("Likes")
                        .HasForeignKey("MentorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("coding_mentor.Models.User", "User")
                        .WithMany("Likes")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Mentor");

                    b.Navigation("User");
                });

            modelBuilder.Entity("coding_mentor.Models.MentorLanguage", b =>
                {
                    b.HasOne("coding_mentor.Models.Language", "Language")
                        .WithMany("MentorLanguages")
                        .HasForeignKey("LanguageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("coding_mentor.Models.Mentor", "Mentor")
                        .WithMany("MentorLanguages")
                        .HasForeignKey("MentorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Language");

                    b.Navigation("Mentor");
                });

            modelBuilder.Entity("coding_mentor.Models.MentorSkill", b =>
                {
                    b.HasOne("coding_mentor.Models.Mentor", "Mentor")
                        .WithMany("MentorSkills")
                        .HasForeignKey("MentorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("coding_mentor.Models.Skill", "Skill")
                        .WithMany("MentorSkills")
                        .HasForeignKey("SkillId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Mentor");

                    b.Navigation("Skill");
                });

            modelBuilder.Entity("coding_mentor.Models.UserRating", b =>
                {
                    b.HasOne("coding_mentor.Models.Mentor", "Mentor")
                        .WithMany("UserRatings")
                        .HasForeignKey("MentorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("coding_mentor.Models.Rating", "Rating")
                        .WithMany("UserRatings")
                        .HasForeignKey("RatingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("coding_mentor.Models.User", "User")
                        .WithMany("UserRatings")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Mentor");

                    b.Navigation("Rating");

                    b.Navigation("User");
                });

            modelBuilder.Entity("coding_mentor.Models.Language", b =>
                {
                    b.Navigation("MentorLanguages");
                });

            modelBuilder.Entity("coding_mentor.Models.Mentor", b =>
                {
                    b.Navigation("Likes");

                    b.Navigation("MentorLanguages");

                    b.Navigation("MentorSkills");

                    b.Navigation("UserRatings");
                });

            modelBuilder.Entity("coding_mentor.Models.Rating", b =>
                {
                    b.Navigation("UserRatings");
                });

            modelBuilder.Entity("coding_mentor.Models.Skill", b =>
                {
                    b.Navigation("MentorSkills");
                });

            modelBuilder.Entity("coding_mentor.Models.User", b =>
                {
                    b.Navigation("Likes");

                    b.Navigation("UserRatings");
                });
#pragma warning restore 612, 618
        }
    }
}
