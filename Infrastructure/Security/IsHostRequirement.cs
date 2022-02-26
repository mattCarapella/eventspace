using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security;

public class IsHostRequirement : IAuthorizationRequirement
{
}

public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
{
	private readonly IHttpContextAccessor _httpContextAccessor;
	private readonly DataContext _dbContext;
	public IsHostRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
	{
		_dbContext = dbContext;
		_httpContextAccessor = httpContextAccessor;
	}

	protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
	{
		// Get User ID (AuthorizationHandlerContext.User is the System.Security.Claims.ClaimsPrincipal representing current user)
		// FindFirstValue() used for ClaimsPrincipal to get value of ClaimType
		var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
		if (userId == null) return Task.CompletedTask;

		// Get Event ID (using HTTP context)
		var eventId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues
			.SingleOrDefault(x => x.Key == "id").Value?.ToString());

		// Get Attendee object (with userId, eventId)
		// var attendee = _dbContext.EventAttendees.FindAsync(userId, eventId).Result;
		var attendee = _dbContext.EventAttendees
			.AsNoTracking()
			.SingleOrDefaultAsync(att => att.AppUserId == userId && att.EventId == eventId)
			.Result;

		if (attendee == null) return Task.CompletedTask;

		// context succeeds if attendee is host
		if (attendee.IsHost) context.Succeed(requirement);

		// return completed task
		return Task.CompletedTask;
	}

}
