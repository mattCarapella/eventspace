using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;
using AutoMapper;
using Application.Core;
using Application.Events;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{
	public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config) 
	{
		services.AddSwaggerGen(c =>
		{
			c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
		});
		// AddDbContext comes from entity framework
		services.AddDbContext<DataContext>(opt =>
		{
			// Configures context to connect to a SQLite db. A connection string must be set before use to connect to a DB.
			// Connection string comes from _config in constructor and is defined in /API/appsettings.Development.json
			opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
		});
		services.AddCors(opt => 
		{
			opt.AddPolicy("CorsPolicy", policy =>
			{
				policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
			});
		});
		services.AddMediatR(typeof(List.Handler).Assembly);
		services.AddAutoMapper(typeof(MappingProfiles).Assembly);

		return services;
	}
}
