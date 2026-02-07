using CampusDash.Backend.Models;
using Microsoft.EntityFrameworkCore;
namespace CampusDash.Backend.Data;
public class ApplicationDbContext : DbContext
{
      public ApplicationDbContext(IDbContextFactory<ApplicationDbContext> options) : base((DbContextOptions)options) 
      {

      }
      public DbSet<Customer> Customers {get;set;} = null!;
      public DbSet<Order> Orders{get;set;} = null!;
}
