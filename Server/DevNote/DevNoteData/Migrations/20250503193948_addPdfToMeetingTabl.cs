using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DevNote.Data.Migrations
{
    /// <inheritdoc />
    public partial class addPdfToMeetingTabl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TranscriptionPdfUrl",
                table: "Meetings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TranscriptionPdfUrl",
                table: "Meetings");
        }
    }
}
