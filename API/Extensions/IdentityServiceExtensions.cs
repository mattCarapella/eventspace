using Microsoft.Extensions.Configuration;

namespace API.Extensions;

public static class IdentityServiceExtensions
{	
	public static IServiceCollection AddIdentityServices(this IServiceCollection services, 
		IConfiguration config)
	{
		services.AddIdentityCore<AppUser>(opt => 
		{
			opt.Password.RequireNonAlphanumeric = false;
			opt.User.RequireUniqueEmail = true;
		})
		.AddEntityFrameworkStores<DataContext>()
		.AddSignInManager<SignInManager<AppUser>>();

		services.AddAuthentication();

		return services;
	}
}
