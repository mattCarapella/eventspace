using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events;

public class UpdateAttendance
{
	public class Command : IRequest<Result<Unit>>
	{
		public Guid Id { get; set; }
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
			// Get activity with attendees
			var _event = await _context.Events
								.Include(a => a.Attendees)
								.ThenInclude(u => u.AppUser)
								.SingleOrDefaultAsync(x => x.Id == request.Id);
			if (_event == null) return null;

			// Get current user using IUserAccessor
			var currUser = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
			if (currUser == null) return null;

			// Get host username
			var hostUsername = _event.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser.UserName;

			// Get attendance status of current user
			var attendance = _event.Attendees.FirstOrDefault(x => x.AppUser.UserName == currUser.UserName);

			if (attendance != null && hostUsername == currUser.UserName)
			{
				// If current user is host, flip IsCancelled
				_event.IsCancelled = !_event.IsCancelled;
			}
			if (attendance != null && hostUsername != currUser.UserName)
			{
				// For normal attendee (non-host) remove from attendance list
				_event.Attendees.Remove(attendance);
			}
			if (attendance == null)
			{
				// If current user is not attending, add to attendance list
				var userToAdd = new EventAttendee 
				{
					AppUser = currUser,
					Event = _event,
					IsHost = false
				};
				_event.Attendees.Add(userToAdd);
			}
			
			// Save changes and return Result
			var result = await _context.SaveChangesAsync() > 0;

			return result
				? Result<Unit>.Success(Unit.Value)
				: Result<Unit>.Failure("Problem updating attendance list.");

		}
	}
	
}
