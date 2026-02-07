using System.ComponentModel.DataAnnotations;
namespace CampusDash.Backend.Models;
public class Order{
    [Key]
    public int Id {get;set;}
    [Required]
    public string CustomerEmail {get;set;} = null!;
    [Required]
    public string DEmail {get;set;} = null!;
    [Required]
    public string StoreName {get;set;} = string.Empty;
    [Required]
    public string Status {get;set;} = "New";
    [Required]
    public double StoreLat {get;set;}
    [Required]
    public double StoreLong {get;set;}
    [Required]
    public double DLat {get;set;}
    [Required]
    public double DelivaryManLong {get;set;}
    [Required]
    public double CustLat {get;set;}
    [Required]
    public double CustLong {get;set;}
    [Required]
    public int Otp {get;set;}
    
}
