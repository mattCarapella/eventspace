using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

public class ChatHub : Hub
{
	private readonly IMediator _mediator;
	public ChatHub(IMediator mediator)
	{
		_mediator = mediator;
	}

	public async Task SendComment(Create.Command command)
	{	
		// save comment to database
		var comment = await _mediator.Send(command);

		// send to everyone connected to hub... each event has its own group
		await Clients.Group(command.EventId.ToString())
			// "ReceiveComment" is used on client side to tell it what to send back
			.SendAsync("ReceieveComment", comment.Value);
	}

	// When client connects to hub, join group
	public override async Task OnConnectedAsync()
	{
		// Get event Id from query string (using HttpContext)
		var httpContext = Context.GetHttpContext();

		var eventId = httpContext.Request.Query["eventId"];

		await Groups.AddToGroupAsync(Context.ConnectionId, eventId);

		// send list of comments to client
		var result = await _mediator.Send(new List.Query{EventId = Guid.Parse(eventId)});

		await Clients.Caller.SendAsync("LoadComments", result.Value);
	}


}
