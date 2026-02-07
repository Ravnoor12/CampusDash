// DTO for location updates
public class LocationUpdateDto
{
        [Required]
        public double Latitude { get; set; }
        
        [Required]
        public double Longitude { get; set; }
}