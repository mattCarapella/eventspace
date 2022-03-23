using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments;
public class Create
{
	public class Command : IRequest<Result<CommentDTO>>
	{
		public string Body { get; set; }
		public Guid EventId { get; set; }
	}

	public class CommandValidator : AbstractValidator<Command>
	{
		public CommandValidator()
		{
			RuleFor(x => x.Body).NotEmpty();
		}
	}

	public class Handler : IRequestHandler<Command, Result<CommentDTO>>
	{
		private readonly DataContext _context;
		private readonly IUserAccessor _userAccessor;
		private readonly IMapper _mapper;
		public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
		{
			_mapper = mapper;
			_userAccessor = userAccessor;
			_context = context;
		}

		public async Task<Result<CommentDTO>> Handle(Command request, CancellationToken cancellationToken)
		{
			var e = await _context.Events.FindAsync(request.EventId);
			if (e == null) return null;

			var user = await _context.Users
				.Include(p => p.Photos)
				.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

			var comment = new Comment
			{
				Author = user,
				Event = e,
				Body = request.Body
			};

			e.Comments.Add(comment);

			var success = await _context.SaveChangesAsync() > 0;

			if (success) return Result<CommentDTO>.Success(_mapper.Map<CommentDTO>(comment));
			return Result<CommentDTO>.Failure("Failed to save comment.");
		}
	}
}