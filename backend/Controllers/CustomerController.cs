using Microsoft.AspNetCore.Mvc;
using CampusDash.Backend.Models;
using CampusDash.Backend.Data;

namespace CampusDash.Backend.Controllers;

[ApiController]
[Route("api/customer")]
public class CustomerController : ControllerBase {
    private readonly ApplicationDbContext _context;
    public CustomerController(ApplicationDbContext context) {
        _context = context;
    }
    [HttpPost("signin")]
    public IActionResult SignIn([FromBody] SignInDto dto) {
        var customer = _context.Customers.FirstOrDefault(c => c.Email == dto.Email);
        if(customer == null || customer.Password.Length == 0 || customer.Password != dto.Password) {
            return Unauthorized("The email is not authorized with the application");
        }
        var result = new Customer
            {
                FirstName = customer.FirstName,
                LastName = customer.LastName,
                Email = customer.Email,
                Latitude = customer.Latitude,
                Longitude = customer.Longitude,
            };

            return Ok(result);
    }
    [HttpPost("signup")]
public IActionResult SignUp([FromBody] SignInDto dto)
{
    // check if email already exists
    var existing = _context.Customers.FirstOrDefault(c => c.Email == dto.Email);
    if (existing != null)
    {
        return BadRequest("Email already registered");
    }

    var newCustomer = new Customer
    {
        Email = dto.Email,
        Password = dto.Password,
        FirstName = dto.FirstName,
        LastName = dto.LastName,
        Latitude = 0,
        Longitude = 0
    };

    _context.Customers.Add(newCustomer);
    _context.SaveChanges();

    return Ok("Customer registered successfully");
}
}
