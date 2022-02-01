namespace Domain;

public class Event
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public DateTime Date { get; set; }
    // public Artist Performer { get; set; }
    // public Artist OpeningActs { get; set; }
    public string Description { get; set; }
    // public ICollection<Photo> Photos { get; set; }
    public float Cost { get; set; }
    public string TicketLink { get; set; }
    public string Category { get; set; }
    public int Likes { get; set; }
    // public User CreatedBy { get; set; }
    public string Genre { get; set; }
    public string Venue { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string Zipcode { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

}
