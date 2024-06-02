using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace coding_mentor.Migrations
{
    /// <inheritdoc />
    public partial class addedchgattable111111 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupMessages_Users_UserId",
                table: "GroupMessages");

            migrationBuilder.DropIndex(
                name: "IX_GroupMessages_UserId",
                table: "GroupMessages");

            migrationBuilder.DropColumn(
                name: "SentAt",
                table: "GroupMessages");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "GroupMessages");

            migrationBuilder.AddColumn<string>(
                name: "User",
                table: "GroupMessages",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "User",
                table: "GroupMessages");

            migrationBuilder.AddColumn<DateTime>(
                name: "SentAt",
                table: "GroupMessages",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "GroupMessages",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_GroupMessages_UserId",
                table: "GroupMessages",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupMessages_Users_UserId",
                table: "GroupMessages",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
