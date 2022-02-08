using Microsoft.AspNetCore.Mvc;
using Persistence;
using MediatR;
using Application.Events;
using System.Collections.Generic;

namespace API.Controllers;

public class EventsController : BaseApiController
{
	// private readonly DataContext _context;
	// public EventsController(DataContext context)
	// {
	// 	_context = context;
	// }

	// *** THIS HAS BEEN MOVED TO BASEAPICONTROLLER ***
	// private readonly IMediator _mediator;

  // public EventsController(IMediator mediator)
  // {
  //   _mediator = mediator;
  // }


  // Returns all events
	[HttpGet]
	public async Task<ActionResult<List<Event>>> GetEvents()
	{
		return await Mediator.Send(new List.Query());
	}

	// Returns a single event.. endpoint is events/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Event>> GetEvent(Guid id)
    {
		return await Mediator.Send(new Details.Query{Id = id});
	}

	[HttpPost]
	public async Task<IActionResult> CreateEvent(Event e)
	{
		return Ok(await Mediator.Send(new Create.Command{Event = e}));
	}

	[HttpPut("{id}")]
	public async Task<IActionResult> EditEvent(Guid id, Event e)
	{
		e.Id = id;
		return Ok(await Mediator.Send(new Edit.Command{Event = e}));
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> DeleteEvent(Guid id)
	{
		return Ok(await Mediator.Send(new Delete.Command{Id = id}));
	}

}
