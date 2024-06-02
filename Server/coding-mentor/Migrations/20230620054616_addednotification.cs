using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace coding_mentor.Migrations
{
    /// <inheritdoc />
    public partial class addednotification : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Seen",
                table: "PrivateMessages",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Seen",
                table: "PrivateMessages");
        }
    }
}
