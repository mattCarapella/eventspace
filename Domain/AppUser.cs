using Microsoft.AspNetCore.Identity;

namespace Domain;

public class AppUser : IdentityUser
{
	public string DisplayName { get; set; }
    public string Bio { get; set; } = string.Empty;
	public ICollection<EventAttendee> Events { get; set; } 
	public ICollection<Photo> Photos { get; set; } 

}
