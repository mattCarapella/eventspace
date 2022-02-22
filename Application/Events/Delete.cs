using Application.Core;
using MediatR;
using Persistence;

namespace Application.Events;
public class Delete
{
  public class Command : IRequest<Result<Unit>>
  {
    public Guid Id { get; set; }
  }

  public class Handler : IRequestHandler<Command, Result<Unit>> 
  {
    private readonly DataContext _context;
    public Handler(DataContext context)
    {
      _context = context;
    }

    public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
    {
      // Removes event without saving changes, returns a Not Found response for non-existent entries
      var ev = await _context.Events.FindAsync(request.Id);
      if (ev == null) return null;
      _context.Remove(ev);

      // SaveChangesAsync() returns the number of changes to the database so result is only successful when its > 0
      var result = await _context.SaveChangesAsync() > 0;
      if (!result) return Result<Unit>.Failure("Failed to delete event.");
      return Result<Unit>.Success(Unit.Value);
    }
  }
}
