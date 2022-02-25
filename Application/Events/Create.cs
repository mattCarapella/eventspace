using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events;
public class Create
{
	public class Command : IRequest<Result<Unit>>
	{
		public Event Event { get; set; }
	}

	public class CommandValidator : AbstractValidator<Command>
	{
		public CommandValidator()
		{
			RuleFor(x => x.Event).SetValidator(new EventValidator());
		}
	}

	public class Handler : IRequestHandler<Command, Result<Unit>>
	{
		private readonly DataContext _context;
		private readonly IUserAccessor _userAccessor;
		public Handler(DataContext context, IUserAccessor userAccessor)
		{
			_userAccessor = userAccessor;
			_context = context;
		}

		public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
		{
			// Get username via IUserAccessor interface 
			var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

			// Create a new EventAttendee object for the user, make event host
			var attendee = new EventAttendee{
				AppUser = user,
				Event = request.Event,
				IsHost = true
			};

			// Add attendee to event and stage event in DB
			request.Event.Attendees.Add(attendee);
			_context.Events.Add(request.Event);

			// Save
			var result = await _context.SaveChangesAsync() > 0;

			// Return a Result
			if (!result) return Result<Unit>.Failure("Failed to create event.");
			return Result<Unit>.Success(Unit.Value);
		}

	}

}


// THIS IS THE HANDLE METHOD PRIOR TO ADDING EVENTATTENDEES FUNCTIONALITY...
// public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
// {
// 	_context.Events.Add(request.Event);
// 	var result = await _context.SaveChangesAsync() > 0;

// 	if (!result) return Result<Unit>.Failure("Failed to create event.");
// 	return Result<Unit>.Success(Unit.Value);
// }