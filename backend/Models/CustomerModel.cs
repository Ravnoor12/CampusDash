using System.ComponentModel.DataAnnotations;
namespace CampusDash.Backend.Models;
public class Customer {
    public  string FirstName {get;set;} = string.Empty;
    public  string LastName {get;set;} =  string.Empty;
    [Key]
    [Required]
    public  string Email {get;set;} = string.Empty;
    public string Password {get;set;} = string.Empty;
    public  double Latitude {get;set;}
    public  double Longitude {get;set;}
}
