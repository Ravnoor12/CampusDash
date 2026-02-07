using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class SeedCustomers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Customers",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "Email", "Active", "FirstName", "Id", "LastName", "Latitude", "Longitude", "Password" },
                values: new object[,]
                {
                    { "developer.3@wright.edu", true, "Bob", 3, "Developer", 39.783000000000001, -84.0655, "HashedPassword789" },
                    { "engineer.2@wright.edu", true, "Alice", 2, "Engineer", 39.771500000000003, -84.063000000000002, "HashedPassword456" },
                    { "rowdy.1@wright.edu", true, "Rowdy", 1, "Raider", 39.781100000000002, -84.064499999999995, "HashedPassword123" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "Email",
                keyValue: "developer.3@wright.edu");

            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "Email",
                keyValue: "engineer.2@wright.edu");

            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "Email",
                keyValue: "rowdy.1@wright.edu");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Customers");
        }
    }
}
