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
	// public async Task<ActionResult<List<Event>>> GetEvents()
	// {
	// 	return await Mediator.Send(new List.Query());
	// }
	public async Task<IActionResult> GetEvents()
	{
		return HandleResult(await Mediator.Send(new List.Query()));
	}

	// Returns a single event.. endpoint is events/{id}
	[HttpGet("{id}")]
	// public async Task<ActionResult<Event>> GetEvent(Guid id)	<= this is changed in sect. 105
	// IActionResult (rather than ActionResult) allows us to return HTTP response 
	public async Task<IActionResult> GetEvent(Guid id)
	{
		// return await Mediator.Send(new Details.Query{Id = id});	<= this is changed in sect. 105
		var result = await Mediator.Send(new Details.Query{Id = id});
		return HandleResult(result);
	}

	[HttpPost]
	public async Task<IActionResult> CreateEvent(Event e)
	{
		return HandleResult(await Mediator.Send(new Create.Command{Event = e}));
	}

	[HttpPut("{id}")]
	public async Task<IActionResult> EditEvent(Guid id, Event e)
	{
		e.Id = id;
		return HandleResult(await Mediator.Send(new Edit.Command{Event = e}));
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> DeleteEvent(Guid id)
	{
		return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
	}

}
