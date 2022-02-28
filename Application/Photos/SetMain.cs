using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos;
public class SetMain
{
	public class Command : IRequest<Result<Unit>>
	{
		public string Id;
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
			// Get currently logged in user with associated photos
			var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());
			if (user == null) return null;

			// Get the photo to be set to main from the id in the request
			var photoToSet = user.Photos.FirstOrDefault(x => x.Id == request.Id);
			if (photoToSet == null) return null;

			// Check if a main photo is already set, update main photo
			var currentMainPhoto = user.Photos.FirstOrDefault(x => x.IsMain == true);
			if (currentMainPhoto != null) currentMainPhoto.IsMain = false;
			photoToSet.IsMain = true;

			// Save changes
			var success = await _context.SaveChangesAsync() > 0;
			if (success) return Result<Unit>.Success(Unit.Value); 
			return Result<Unit>.Failure("Problem setting main photo.");
		}
	}

}
