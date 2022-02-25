using System.Collections.Generic;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events;
public class List
{
	public class Query : IRequest<Result<List<EventDTO>>> { }

	public class Handler : IRequestHandler<Query, Result<List<EventDTO>>>
	{
		private readonly DataContext _context;
		private readonly IMapper _mapper;
		public Handler(DataContext context, IMapper mapper)
		{
			_mapper = mapper;
			_context = context;
		}

		public async Task<Result<List<EventDTO>>> Handle(Query request, CancellationToken cancellationToken)
		{
			// Return a list of events with attendees. The initial Include() is just the join 
			//table so we also have to include ThenInclude() with the users.
			// var events = await _context.Events
			// 	.Include(a => a.Attendees)
			// 	.ThenInclude(u => u.AppUser)
			// 	.ToListAsync(cancellationToken);

			// This method which replaces whats above, uses projection to return a smaller, more specific set 
			// of data
			var events = await _context.Events
				.ProjectTo<EventDTO>(_mapper.ConfigurationProvider)
				.ToListAsync(cancellationToken);

			// Use Automapper to create a mapping profile from <Event> to <EventDTO> to avoid cycle error
			// when trying to get a list of Events with Attendees.
			var eventsToReturn = _mapper.Map<List<EventDTO>>(events);

			return Result<List<EventDTO>>.Success(eventsToReturn);
		}

	}

}



// THIS WAS PRIOR TO ADDING EVENT ATTENDEES
// public async Task<Result<List<Event>>> Handle(Query request, CancellationToken cancellationToken)
// {
// 	//return await _context.Events.ToListAsync();
// 	return Result<List<Event>>.Success(await _context.Events.ToListAsync(cancellationToken));
// }