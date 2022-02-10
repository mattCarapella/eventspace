using MediatR;
using Persistence;

namespace Application.Events;
public class Delete
{
  public class Command : IRequest
  {
    public Guid Id { get; set; }
  }

  public class Handler : IRequestHandler<Command>
  {
    private readonly DataContext _context;
    public Handler(DataContext context)
    {
      _context = context;
    }

    public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
    {
		var ev = await _context.Events.FindAsync(request.Id);
		_context.Remove(ev);
		await _context.SaveChangesAsync();
		return Unit.Value;
    }
  }
}