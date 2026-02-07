using System.ComponentModel.DataAnnotations;
namespace Campus.Backend.Models;
public class Order
{
    [Key]
    public int Id {get;set;}
    [Required]
    [ForeignKey("Customer")]
    public string CustomerEmail { get; set; } = null!;
    [Required]
    [ForeignKey("Customer")]
    public string DelivaryManEmail {get;set;} = null!;
    [Required]
    public string StoreName {get;set;} = string.Empty;
    [Required]
    public string Status {get;set;} = "New";
    [Required]
    public double StoreLat {get;set;}
    [Required]
    public double StoreLong {get;set;}
    [Required]
    public int Otp {get;set;}
    public virtual Customer Customer { get; set; }
    public virtual Customer Devliveryman { get; set; }
}
