using System.Diagnostics.Contracts;

public class LocateDto
    {
        public string OrderName { get; set; } = null!; // single order
        public string CustomerEmail { get; set; } = null!;
        public string CustomerAddress {get; set; } = string.Empty;
        public string ShoppingList {get; set;} = string.Empty;
        public double CustomerLat { get; set; }
        public double CustomerLong { get; set; }
        public double ShopLat { get; set; }
        public double ShopLong { get; set; }
        public string DelivoryEmail {get; set;}
        public double DelivoryLat {get; set;}
        public double DelivoryLong {get; set;}
        public string Status { get; set; } = "New";
    }