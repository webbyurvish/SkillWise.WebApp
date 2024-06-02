using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace coding_mentor.Migrations
{
    /// <inheritdoc />
    public partial class _145 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsMentor",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "Users");

            migrationBuilder.AddColumn<bool>(
                name: "IsMentor",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
