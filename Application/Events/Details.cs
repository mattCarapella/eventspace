using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Events;
public class Details
{
    //public class Query : IRequest<Event>
    // This is changed to return a result object containing an Event in section 105
    public class Query : IRequest<Result<Event>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<Event>>
    {
        private readonly DataContext _context;
        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<Event>> Handle(Query request, CancellationToken cancellationToken)
        {
            // This was changed in sect. 105 from => return await _context.Events.FindAsync(request.Id);
            var e = await _context.Events.FindAsync(request.Id);       
            return Result<Event>.Success(e);
        }
    
    }
}
