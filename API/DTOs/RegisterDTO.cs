namespace API.DTOs;

public class RegisterDTO
{
	// This is the data used when a user registers
	public string DisplayName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Username { get; set; }
}
