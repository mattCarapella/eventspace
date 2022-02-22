using System.Net;
using System.Text.Json;
using Application.Core;
using Microsoft.AspNetCore.Http;

namespace API.Middleware;
public class ExceptionMiddleware
{
    // Middleware is used in API/StartUp.cs

	private readonly RequestDelegate _next;
	private readonly ILogger<ExceptionMiddleware> _logger;
	private readonly IHostEnvironment _env;

	public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
	{
		// IHostEnvironment lets us know if we're in development or production mode
		_env = env;
		_logger = logger;
		// Each piece of middleware is a RequestDelegate and has a next() method
		_next = next;
	}

  	public async Task InvokeAsync(HttpContext context) {
		try
		{
			await _next(context);
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, "************ Now in ExceptionMiddleware InvokeAsync()");
			// If we get exception anywhere in API request, its caught and handled here
			_logger.LogError(ex, ex.Message);
			context.Response.ContentType = "application/json";
			context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

            // send back full exception with stack trace in development mode or status code & message in production
			var response = _env.IsDevelopment()			
				? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
				: new AppException(context.Response.StatusCode, "Server Error.");

			var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

			var json = JsonSerializer.Serialize(response, options);
			
			await context.Response.WriteAsync(json);
		}
	}
}
