namespace Domain;
public class Comment
{
	public int Id { get; set; }
	public string Body { get; set; }	
	public AppUser Author { get; set; }
	public Event Event { get; set; }
	public Boolean Flagged { get; set; } = false;
	public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
	public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

}
