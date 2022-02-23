using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDTO
{
	// This is the data used when a user registers
	[Required]
	public string DisplayName { get; set; }

	[Required]
	[EmailAddress]
    public string Email { get; set; }

	[Required]
	[RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,10}$", ErrorMessage = "Password must be more complex...")]
	// (?=.*\\d)) -> at least one number
	// (?=.*[a-z]) -> at least one lower case char
	// (?=.*[A-Z]) -> at least one upper case char
	// .{4,10} -> 4 to 10 characters in length
    public string Password { get; set; }

	[Required]
    public string Username { get; set; }
	
}
