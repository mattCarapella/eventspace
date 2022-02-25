using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events;
public class Details
{
	//public class Query : IRequest<Event>
	// This is changed to return a result object containing an Event in section 105
	public class Query : IRequest<Result<EventDTO>>
	{
		public Guid Id { get; set; }
	}

	public class Handler : IRequestHandler<Query, Result<EventDTO>>
	{
		private readonly DataContext _context;
		private readonly IMapper __mapper;
		public Handler(DataContext context, IMapper _mapper)
		{
			__mapper = _mapper;
			_context = context;
		}

		public async Task<Result<EventDTO>> Handle(Query request, CancellationToken cancellationToken)
		{
			var e = await _context.Events
				.ProjectTo<EventDTO>(__mapper.ConfigurationProvider)
				.FirstOrDefaultAsync(x => x.Id == request.Id);

			return Result<EventDTO>.Success(e);
		}

	}
}




// THIS WAS THE HANDLER PRIOR TO ADDING EVENT ATTENDEES
// public async Task<Result<Event>> Handle(Query request, CancellationToken cancellationToken)
// {
// 	var e = await _context.Events.FindAsync(request.Id);       
// 	return Result<Event>.Success(e);
// }
