using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Events;
using MediatR;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Persistence;
using Application.Core;
using API.Extensions;
using FluentValidation.AspNetCore;
using API.Middleware;

namespace API;

public class Startup
{
    private readonly IConfiguration _config;
    public Startup(IConfiguration config) 
    {
        _config = config;
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
    	services.AddControllers(opt => {
			// Create an authorization policy so every endpoint requires authentication unless we specify otherwise
			var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
			// Filters are applied to all actions. Add [AllowAnonymous] to bypass the auth filter
			opt.Filters.Add(new AuthorizeFilter(policy));
		})
		.AddFluentValidation(config =>                 
      	{
        	config.RegisterValidatorsFromAssemblyContaining<Create>();
      	});
		// Services have been moved to API/Extensions/ApplicationServiceExtensions.cs
		services.AddApplicationServices(_config);  
		services.AddIdentityServices(_config); 
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        // This replaces app.UseDeveloperExceptionPage() which was previously here;
        app.UseMiddleware<ExceptionMiddleware>();        

        if (env.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
        }

        // app.UseHttpsRedirection();

        app.UseRouting();

        app.UseCors("CorsPolicy"); 

		app.UseAuthentication();	// NOTE: This always must be before app.UseAuthorization()
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
	
}

