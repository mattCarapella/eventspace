using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos;
public class Delete
{
	public class Command : IRequest<Result<Unit>>
	{
		public string Id { get; set; }
	}

	public class Handler : IRequestHandler<Command, Result<Unit>>
	{
		private readonly DataContext _context;
		private readonly IPhotoAccessor _photoAccessor;
		private readonly IUserAccessor _userAccessor;
		public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
		{
			_userAccessor = userAccessor;
			_photoAccessor = photoAccessor;
			_context = context;
		}

		public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
		{
			// Get currrent user with photos
			var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
			if (user == null) return null;

			// Get photo to delete (already have user and photos in memory so no need for async)
			var photo = user.Photos.FirstOrDefault(p => p.Id == request.Id);
			if (photo == null) return null;
			
			// If its users main photo, dont allow deletion
			if (photo.IsMain) return Result<Unit>.Failure("Main photo can not be deleted.");

			// Attempt to delete from Cloudinary
			var result = await _photoAccessor.DeletePhoto(photo.Id);
			if (result == null) return Result<Unit>.Failure("There was an issue deleting photo from Cloudinary.");

			// Remove from user's photos
			user.Photos.Remove(photo);
			
			// Remove from database
			var p = _context.Remove(photo);	
			if (p == null) return  Result<Unit>.Failure("There was an issue deleting photo from the database.");

			var success = await _context.SaveChangesAsync() > 0;
			if (success) return Result<Unit>.Success(Unit.Value);
			return Result<Unit>.Failure("Photo could not be deleted (API issue).");
		}
	}

}
