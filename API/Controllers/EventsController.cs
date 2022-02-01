using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers;

public class EventsController : BaseApiController
{
	private readonly DataContext _context;
	public EventsController(DataContext context)
	{
		_context = context;
	}

	// Returns all events
	[HttpGet]
	public async Task<ActionResult<List<Event>>> GetEvents()
	{
		return await _context.Events.ToListAsync();
	}

	// Returns a single activity.. endpoint is activities/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Event>> GetEvent(Guid id)
    {
        return await _context.Events.FindAsync(id); 
    }

}
