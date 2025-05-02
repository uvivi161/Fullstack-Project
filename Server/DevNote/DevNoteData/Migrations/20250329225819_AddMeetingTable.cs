using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DevNote.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddMeetingTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MeetingId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Meetings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    occurredIn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meetings", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_MeetingId",
                table: "Users",
                column: "MeetingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Meetings_MeetingId",
                table: "Users",
                column: "MeetingId",
                principalTable: "Meetings",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Meetings_MeetingId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Meetings");

            migrationBuilder.DropIndex(
                name: "IX_Users_MeetingId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "MeetingId",
                table: "Users");
        }
    }
}
