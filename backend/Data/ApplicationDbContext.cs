using Microsoft.EntityFrameworkCore;
using CampusDash.Backend.Models;
namespace CampusDash.Backend.Data;
public class ApplicationDbContext : DbContext {
      public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {

      }
      public DbSet<Customer> Customers {get;set;} = null!;
      public DbSet<Order> Orders{get;set;} = null!;
}
