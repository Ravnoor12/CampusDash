using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddActiveToCustomer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DeliveryManLat",
                table: "Orders",
                newName: "DLat");

            migrationBuilder.RenameColumn(
                name: "DelivaryManEmail",
                table: "Orders",
                newName: "DEmail");

            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "Customers",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Active",
                table: "Customers");

            migrationBuilder.RenameColumn(
                name: "DLat",
                table: "Orders",
                newName: "DeliveryManLat");

            migrationBuilder.RenameColumn(
                name: "DEmail",
                table: "Orders",
                newName: "DelivaryManEmail");
        }
    }
}
