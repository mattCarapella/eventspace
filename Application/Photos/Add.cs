using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos;

public class Add
{
	public class Command : IRequest<Result<Photo>>
	{
		public IFormFile File { get; set; }
	}

	public class Handler : IRequestHandler<Command, Result<Photo>>
	{
		private readonly DataContext _context;
		private readonly IPhotoAccessor _photoAccessor;
		private readonly IUserAccessor _userAccessor;
		public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
		{
			// userAccessor has method GetUsername() to get username of currently logged in user
			_userAccessor = userAccessor;
			// photoAccessor has methods AddPhoto(), DeletePhoto()
			_photoAccessor = photoAccessor;
			_context = context;
		}

		public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
		{
			// get currently logged in user
			var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
			if (user == null) return null;

			// upload photo to cloudinary
			var photoUploadResult = await _photoAccessor.AddPhoto(request.File);

			// set photo properties
			var photo = new Photo
			{
				Url = photoUploadResult.Url,
				Id = photoUploadResult.PublicId	
			};

			// set to main photo if its the users first upload
			if (!user.Photos.Any(p => p.IsMain)) photo.IsMain = true;

			// add to user's photos
			user.Photos.Add(photo);

			// save changes
			var result = await _context.SaveChangesAsync() > 0;
			if (result) return Result<Photo>.Success(photo);
			return Result<Photo>.Failure("Failed to save image.");
		}
	}

}
