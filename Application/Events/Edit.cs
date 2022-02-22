using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Events;

public class Edit
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
		private readonly IMapper _mapper;
		
		public Handler(DataContext context, IMapper mapper)
		{
			_mapper = mapper;
			_context = context;
		}

		public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
		{
			var ev = await _context.Events.FindAsync(request.Event.Id);
			if (ev == null) return null;

			// Map all params to event
			_mapper.Map(request.Event, ev);

			var result = await _context.SaveChangesAsync() > 0;
			if (!result) return Result<Unit>.Failure("Changes were not saved.");
			return Result<Unit>.Success(Unit.Value);			
		}
  }
}