using Microsoft.AspNetCore.MVC;
using CampusDash.Backend.Models;
using CampusDash.Backend.Data;

namespace CampusDash.Backend.Controllers;
[ApiController]
[Route("api/order")]
public class OrderController : ControllerBase {
    private readonly ApplicationDbContext _context;
    private const double EarthRadius = 6731;
    public OrderController(ApplicationDbContext context) {
        _context = context;
    }
    internal double HarvisineDistance(double long1,double long2,double lat1,double lat2) {
        double dlat = lat2 - lat1;
        double dlong = long2 - long1;
        double a = Math.Pow(Math.Sin(dlat/2),2) + Math.Cos(lat1)*Math.Cos(lat2) +
                   Math.Pow(Math.Sin(dlong/2),2);
        double c = 2*Math.Atan2(Math.Sqrt(a),Math.Sqrt(1-a));
        double cald = EarthRadius * c;
        return cald;
    }
    [HttpGet("distance")]
    public IActionResult Order([FromBody] OrderDto dto) {
        double customer_lat  = DegreeRad(dto.CustomerLat);
        double customer_long = DegreeRad(dto.CustomerLat);
        double shop_lat = DegreeRad(dto.ShopLat);
        double shop_long = DegreeRad(dto.ShopLong);

    }
    public double DegreeRad(double deg) => deg*Math.PI /180;
    [HttpGet("/cheapest")]

}
