namespace Domain;

public class Event
{
	public Guid Id { get; set; }
	public string Name { get; set; }
	public DateTime Date { get; set; }
	// public DateTime EndDate { get; set; }
	public string Description { get; set; }
	public string Cost { get; set; } = string.Empty;
	public string CostMax { get; set; } = string.Empty;
	public string TicketLink { get; set; } = string.Empty;
	public string NumberOfTickets { get; set; } = string.Empty;
	// public DateTime SaleStart { get; set; }
	// public DateTime SaleEnd { get; set; }
	// public string EventType { get; set; } 
	public string Category { get; set; }
	public int Likes { get; set; } = 0;
	public string Genre { get; set; } = string.Empty;
	public string Venue { get; set; }
	public string Address { get; set; } = string.Empty;
	public string City { get; set; }
	public string State { get; set; }
	public string Country { get; set; } = string.Empty;
	public string Zipcode { get; set; }
	public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
	public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
	public bool IsCancelled { get; set; }
	public ICollection<EventAttendee> Attendees { get; set; } = new List<EventAttendee>();

}
