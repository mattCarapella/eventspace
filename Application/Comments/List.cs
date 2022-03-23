using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments;
public class List
{
	public class Query : IRequest<Result<List<CommentDTO>>>
	{
		public Guid EventId { get; set; }
	}

	public class Handler : IRequestHandler<Query, Result<List<CommentDTO>>>
	{
		private readonly DataContext _context;
		private readonly IMapper _mapper;
		public Handler(DataContext context, IMapper mapper)
		{
			_mapper = mapper;
			_context = context;
		}

		public async Task<Result<List<CommentDTO>>> Handle(Query request, CancellationToken cancellationToken)
		{
			// get all comments for event, order by date, project to CommentDTO, and execute lists
			var comments = await _context.Comments
				.Where(x => x.Event.Id == request.EventId)
				.OrderBy(x => x.CreatedAt)
				.ProjectTo<CommentDTO>(_mapper.ConfigurationProvider)
				.ToListAsync();

			return Result<List<CommentDTO>>.Success(comments);
		}
	}

}
