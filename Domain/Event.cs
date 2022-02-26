namespace Domain;

public class Event
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public DateTime Date { get; set; }
	public DateTime? EndDate { get; set; }
    public string Description { get; set; }
    public float Cost { get; set; }
	public float CostMax { get; set; }
    public string TicketLink { get; set; }
	public int NumberOfTickets { get; set; }
	public DateTime SaleStart { get; set; }
	public DateTime SaleEnd { get; set; }
	public string EventType { get; set; } 
    public string Category { get; set; }
    public int Likes { get; set; }
    public string Genre { get; set; }
    public string Venue { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string State { get; set; }
	public string Country { get; set; }
    public string Zipcode { get; set; }
	public bool IsCancelled { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
	public ICollection<EventAttendee> Attendees { get; set; } = new List<EventAttendee>();

	// public ICollection<Photo> Photos { get; set; }
	// public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

}
