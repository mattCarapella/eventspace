namespace Domain;

public class EventAttendee
{
	public AppUser AppUser { get; set;}
	public string AppUserId { get; set;}
	public Event Event { get; set;}
	public Guid EventId { get; set;}
	public bool IsHost { get; set;}
	
}
