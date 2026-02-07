using Microsoft.AspNetCore.Mvc;
using CampusDash.Backend;
namespace CampusDash.Backend.Controllers;

public class OrderController
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // POST: api/Order
        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(Order order)
        {
            // Validate required properties
            if (string.IsNullOrEmpty(order.CustomerEmail) ||
                string.IsNullOrEmpty(order.DelivaryManEmail) ||
                string.IsNullOrEmpty(order.StoreName))
            {
                return BadRequest("CustomerEmail, DelivaryManEmail, and StoreName are required.");
            }

            // Set default status if not provided
            if (string.IsNullOrEmpty(order.Status))
            {
                order.Status = "New";
            }

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }

        // PUT: api/Order/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, Order orderUpdate)
        {
            if (id != orderUpdate.Id)
            {
                return BadRequest("ID mismatch");
            }

            var existingOrder = await _context.Orders.FindAsync(id);
            if (existingOrder == null)
            {
                return NotFound();
            }

            // Update all properties
            existingOrder.CustomerEmail = orderUpdate.CustomerEmail;
            existingOrder.DelivaryManEmail = orderUpdate.DelivaryManEmail;
            existingOrder.StoreName = orderUpdate.StoreName;
            existingOrder.Status = orderUpdate.Status;
            existingOrder.StoreLat = orderUpdate.StoreLat;
            existingOrder.StoreLong = orderUpdate.StoreLong;
            existingOrder.Otp = orderUpdate.Otp;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // PATCH: api/Order/5/status
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] string status)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            order.Status = status;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/Order/5/location
        [HttpPatch("{id}/location")]
        public async Task<IActionResult> UpdateDeliveryManLocation(int id, 
            [FromBody] LocationUpdateDto locationUpdate)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            order.DeliveryManLat = locationUpdate.Latitude;
            order.DelivaryManLong = locationUpdate.Longitude;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Order/customer/{email}
        [HttpGet("customer/{email}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByCustomer(string email)
        {
            return await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.Devliveryman)
                .Where(o => o.CustomerEmail == email)
                .ToListAsync();
        }

        // GET: api/Order/deliveryman/{email}
        [HttpGet("deliveryman/{email}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByDeliveryMan(string email)
        {
            return await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.Devliveryman)
                .Where(o => o.DelivaryManEmail == email)
                .ToListAsync();
        }

        // GET: api/Order/store/{storeName}
        [HttpGet("store/{storeName}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByStore(string storeName)
        {
            return await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.Devliveryman)
                .Where(o => o.StoreName == storeName)
                .ToListAsync();
        }

        // GET: api/Order/status/{status}
        [HttpGet("status/{status}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByStatus(string status)
        {
            return await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.Devliveryman)
                .Where(o => o.Status == status)
                .ToListAsync();
        }

        // GET: api/Order/otp/{otp}
        [HttpGet("otp/{otp}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByOtp(int otp)
        {
            return await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.Devliveryman)
                .Where(o => o.Otp == otp)
                .ToListAsync();
        }

        // GET: api/Order/verify/{id}/{otp}
        [HttpGet("verify/{id}/{otp}")]
        public async Task<ActionResult<bool>> VerifyOrderOtp(int id, int otp)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            return order.Otp == otp;
        }

        // GET: api/Order/search
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Order>>> SearchOrders(
            [FromQuery] string? customerEmail = null,
            [FromQuery] string? deliveryManEmail = null,
            [FromQuery] string? storeName = null,
            [FromQuery] string? status = null,
            [FromQuery] int? otp = null)
        {
            var query = _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.Devliveryman)
                .AsQueryable();

            if (!string.IsNullOrEmpty(customerEmail))
                query = query.Where(o => o.CustomerEmail.Contains(customerEmail));

            if (!string.IsNullOrEmpty(deliveryManEmail))
                query = query.Where(o => o.DelivaryManEmail.Contains(deliveryManEmail));

            if (!string.IsNullOrEmpty(storeName))
                query = query.Where(o => o.StoreName.Contains(storeName));

            if (!string.IsNullOrEmpty(status))
                query = query.Where(o => o.Status == status);

            if (otp.HasValue && otp.Value > 0)
                query = query.Where(o => o.Otp == otp.Value);

            return await query.ToListAsync();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
        // GET: api/Order/status/{status}
        [HttpGet("status/{status}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByStatus(string status)
        {
            return await _context.Orders
                .Where(o => o.Status == status)
                .ToListAsync();
        }
}