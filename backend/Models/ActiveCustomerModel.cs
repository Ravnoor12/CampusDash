using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CampusDash.Backend.Models;

public class ActiveCustomer
{
    [Required]
    public string Email {get;set;} = string.Empty;
    public double Logititude {get; set;}
    public double Latitude {get; set;}

    [ForeignKey("Email")]
    public virtual Customer Customer { get; set; }
}
