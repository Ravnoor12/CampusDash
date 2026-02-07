using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
namespace CampusDash.Backend.Data;
public class OrderDto {
    [Required]
    public string CustomerEmail {get;set;} = null!;
    [Required]
    public List<string> DEmail {get;set;} = new();
    [Required]
    public double CustomerLat {get;set;}
    [Required]
    public double CustomerLong {get;set;}
    [Required]
    public List<double> DLat {get;set;} = new();
    [Required]
    public List<double> DLong {get;set;} = new();
    [Required]
    public double ShopLat {get;set;}
    [Required]
    public double ShopLong {get;set;}
}
