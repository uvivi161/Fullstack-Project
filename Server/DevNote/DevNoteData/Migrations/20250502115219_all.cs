using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DevNote.Data.Migrations
{
    /// <inheritdoc />
    public partial class all : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_Transcriptions_Files_FileId",
            //    table: "Transcriptions");

            //migrationBuilder.DropIndex(
            //    name: "IX_Transcriptions_FileId",
            //    table: "Transcriptions");

            migrationBuilder.DropColumn(
                name: "FileId",
                table: "Transcriptions");

            migrationBuilder.RenameColumn(
                name: "TranscribedText",
                table: "Transcriptions",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "TranscribedAt",
                table: "Transcriptions",
                newName: "CreatedAt");

            migrationBuilder.AddColumn<string>(
                name: "OriginalFileUrl",
                table: "Transcriptions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TranscriptionPdfUrl",
                table: "Transcriptions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OriginalFileUrl",
                table: "Transcriptions");

            migrationBuilder.DropColumn(
                name: "TranscriptionPdfUrl",
                table: "Transcriptions");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Transcriptions",
                newName: "TranscribedText");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Transcriptions",
                newName: "TranscribedAt");

            migrationBuilder.AddColumn<int>(
                name: "FileId",
                table: "Transcriptions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            //migrationBuilder.CreateIndex(
            //    name: "IX_Transcriptions_FileId",
            //    table: "Transcriptions",
            //    column: "FileId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transcriptions_Files_FileId",
                table: "Transcriptions",
                column: "FileId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
