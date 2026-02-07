using Microsoft.AspNetCore.Mvc;
using CampusDash.Backend.DTO;
using CampusDash.Backend.Data;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CampusDash.Backend.Controllers
{
    [ApiController]
    [Route("api/order")]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private const double EarthRadius = 6731; // km

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

        public double DegreeRad(double deg) => deg * Math.PI / 180;

        // POST: api/order/create
        [HttpPost("create")]
        public IActionResult CreateOrder([FromBody] OrderDto orderDto)
        {
            if (string.IsNullOrEmpty(orderDto.OrderName))
                return BadRequest("Order cannot be empty.");

            orderDto.Status = "In Progress";

            return Ok(new { Message = "Order created", Order = orderDto.OrderName });
        }

        // POST: api/order/assign
        [HttpPost("assign")]
        public IActionResult AssignDelivery([FromBody] OrderDto orderDto)
        {
            if (orderDto == null || string.IsNullOrEmpty(orderDto.OrderName))
                return BadRequest("Order must be provided.");

            if (orderDto.DLat.Count != orderDto.DLong.Count || orderDto.DLat.Count != orderDto.DEmail.Count)
                return BadRequest("All delivery lists (emails, lat, long) must have the same length.");

            double customerLatRad = DegreeRad(orderDto.CustomerLat);
            double customerLongRad = DegreeRad(orderDto.CustomerLong);
            double shopLatRad = DegreeRad(orderDto.ShopLat);
            double shopLongRad = DegreeRad(orderDto.ShopLong);

            double minDistance = double.MaxValue;
            int idx = -1;

            for (int i = 0; i < orderDto.DLat.Count; i++)
            {
                // Skip delivery person if already assigned
                if (orderDto.AssignedEmails != null && orderDto.AssignedEmails.Contains(orderDto.DEmail[i]))
                    continue;

                double dLatRad = DegreeRad(orderDto.DLat[i]);
                double dLongRad = DegreeRad(orderDto.DLong[i]);

                double distance = HarvisineDistance(customerLongRad, dLongRad, customerLatRad, dLatRad)
                                + HarvisineDistance(shopLongRad, dLongRad, shopLatRad, dLatRad);

                if (distance < minDistance)
                {
                    minDistance = distance;
                    idx = i;
                }
            }

            if (idx == -1)
                return NotFound("No available delivery person for this order.");

            // Track assigned delivery emails
            orderDto.AssignedEmails ??= new List<string>();
            orderDto.AssignedEmails.Add(orderDto.DEmail[idx]);

            // Generate OTP
            int otp = GenerateOtp();

            // Estimated delivery time (simple: 30 min per 10 km)
            double estimatedTimeMinutes = minDistance * 3;

            return Ok(new
            {
                DeliveryEmail = orderDto.DEmail[idx],
                Order = orderDto.OrderName,
                DistanceKm = Math.Round(minDistance, 2),
                EstimatedTimeMinutes = Math.Round(estimatedTimeMinutes, 0),
                OTP = otp
            });
        }

        // OTP generator
        private int GenerateOtp()
        {
            Random rand = new Random();
            return rand.Next(1000, 10000);
        }
    }
}
