namespace CampusDash.Backend.DTO;
public class OrderDto
    {
        public string OrderName { get; set; } = null!; // single order
        public string CustomerEmail { get; set; } = null!;
        public string CustomerAddress {get; set; } = string.Empty;
        public List<string> ShoppingList {get; set;} = new();
        public double CustomerLat { get; set; }
        public double CustomerLong { get; set; }
        public double ShopLat { get; set; }
        public double ShopLong { get; set; }
        public List<string> DEmail { get; set; } = new();
        public List<double> DLat { get; set; } = new();
        public List<double> DLong { get; set; } = new();
        public List<string> AssignedEmails { get; set; } = new(); // track assigned delivery persons
        public string Status { get; set; } = "New";
    }
