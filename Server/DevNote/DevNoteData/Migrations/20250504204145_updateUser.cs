using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DevNote.Data.Migrations
{
    /// <inheritdoc />
    public partial class updateUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "occurredIn",
                table: "Meetings",
                newName: "OccurredIn");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OccurredIn",
                table: "Meetings",
                newName: "occurredIn");
        }
    }
}
