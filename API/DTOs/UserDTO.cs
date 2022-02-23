namespace API.DTOs;

public class UserDTO
{
	// This is sent back after user is logged in
    public string DisplayName { get; set; }
    public string Token { get; set; }
    public string Username { get; set; }
    public string Image { get; set; }
	
}
