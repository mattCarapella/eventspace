namespace Application.Comments;

public class CommentDTO
{
	public int Id { get; set; }
	public DateTime createdAt { get; set; }
	public DateTime updatedAt { get; set; }
	public string Body { get; set; }
	public string Username { get; set; }
	public string DisplayName { get; set; }
	public string Image { get; set; }
	public Boolean Flagged { get; set; }

}
