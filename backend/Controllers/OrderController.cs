using Microsoft.AspNetCore.Mvc;
using CampusDash.Backend.Data;

namespace CampusDash.Backend.Controllers;

[ApiController]
[Route("api/order")]
public class OrderController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private const double EarthRadius = 6731;

    public OrderController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Haversine formula to calculate distance between two coordinates
    internal double HarvisineDistance(double long1, double long2, double lat1, double lat2)
    {
        double dlat = lat2 - lat1;
        double dlong = long2 - long1;
        double a = Math.Pow(Math.Sin(dlat / 2), 2) + Math.Cos(lat1) * Math.Cos(lat2) *
                   Math.Pow(Math.Sin(dlong / 2), 2);
        double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
        return EarthRadius * c;
    }

    [HttpPost("distance")]
    public IActionResult GetNearestDelivery([FromBody] OrderDto dto)
    {
        if (dto.DLat.Count != dto.DLong.Count || dto.DLat.Count != dto.DEmail.Count)
            return BadRequest("All delivery lists (emails, lat, long) must have the same length.");

        double customerLatRad = DegreeRad(dto.CustomerLat);
        double customerLongRad = DegreeRad(dto.CustomerLong); // fixed
        double shopLatRad = DegreeRad(dto.ShopLat);
        double shopLongRad = DegreeRad(dto.ShopLong);

        double minDistance = double.MaxValue;
        int idx = -1;

        for (int i = 0; i < dto.DLat.Count; i++)
        {
            double dLatRad = DegreeRad(dto.DLat[i]);
            double dLongRad = DegreeRad(dto.DLong[i]);

            double distance = HarvisineDistance(customerLongRad, dLongRad, customerLatRad, dLatRad)
                            + HarvisineDistance(shopLongRad, dLongRad, shopLatRad, dLatRad);

            if (distance < minDistance)
            {
                minDistance = distance;
                idx = i;
            }
        }

        if (idx == -1)
            return NotFound("No delivery person is near your order location.");

        return Ok(new { Email = dto.DEmail[idx], Distance = minDistance });
    }

    public double DegreeRad(double deg) => deg * Math.PI / 180;
}
