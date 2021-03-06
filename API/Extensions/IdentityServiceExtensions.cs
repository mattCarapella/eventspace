using System.Text;
using API.Services;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

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

		// This key should be the same as the one sent from Services/TokenService.cs
		var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKeyTest"]));

		// Defines the JWT authentication scheme. JWT bearer authorization performs auth by
		// extracting and validating a JWT token from the Authorization request header
		services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
			.AddJwtBearer(opt => {
				// Determines how token will be validated
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    // Compares key with what stored on the server
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
				opt.Events = new JwtBearerEvents
				{
					OnMessageReceived = context => 
					{
						var accessToken = context.Request.Query["access_token"];
						var path = context.HttpContext.Request.Path;
						if (!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/chat")))
						{
							context.Token = accessToken;
						}
						return Task.CompletedTask;
					}
				};
			});
		
		services.AddAuthorization(opt => 
		{
			opt.AddPolicy("IsEventHost", policy => 
			{
				policy.Requirements.Add(new IsHostRequirement());
			});
		});

		services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();

		// AddScoped() scopes the service (the token here) to the lifetime of the HTTP request
		services.AddScoped<TokenService>();

		return services;
	}

}
