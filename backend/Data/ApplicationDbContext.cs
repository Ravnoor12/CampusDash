using Microsoft.EntityFrameworkCore;
using CampusDash.Backend.Models;
namespace CampusDash.Backend.Data;
public class ApplicationDbContext : DbContext {
      public ApplicationDbContext(DbContext<ApplicationDbContext> options) : base(options) {

      }
      public DbSet<Customer> Customer = null!;
}
