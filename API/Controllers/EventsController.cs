using Microsoft.AspNetCore.Mvc;
using Persistence;
using MediatR;
using Application.Events;
using System.Collections.Generic;

namespace API.Controllers;

public class EventsController : BaseApiController
{
  	// Returns all events
	[HttpGet]
	public async Task<IActionResult> GetEvents()
	{
		return HandleResult(await Mediator.Send(new List.Query()));
	}

	// Returns a single event.. endpoint is events/{id}
	[HttpGet("{id}")]
	public async Task<IActionResult> GetEvent(Guid id)
	{
		// IActionResult (rather than ActionResult) allows us to return HTTP response 
		var result = await Mediator.Send(new Details.Query{Id = id});
		return HandleResult(result);
	}

	[HttpPost]
	public async Task<IActionResult> CreateEvent(Event e)
	{
		return HandleResult(await Mediator.Send(new Create.Command{Event = e}));
	}

	[Authorize(Policy = "IsEventHost")]		// Policy defined in IdentityServiceExtensions.cs (API/Extensions) and IsHostRequirement.cs (Infrastructure/Security)
	[HttpPut("{id}")]
	public async Task<IActionResult> EditEvent(Guid id, Event e)
	{
		e.Id = id;
		return HandleResult(await Mediator.Send(new Edit.Command{Event = e}));
	}

	[Authorize(Policy = "IsEventHost")]
	[HttpDelete("{id}")]
	public async Task<IActionResult> DeleteEvent(Guid id)
	{
		return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
	}

	[HttpPost("{id}/attend")]
	public async Task<IActionResult> Attend(Guid id)
	{
		return HandleResult(await Mediator.Send(new UpdateAttendance.Command{Id = id}));
	}

}
