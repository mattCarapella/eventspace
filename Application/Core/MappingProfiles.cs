using Application.Comments;
using Application.Events;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Event, Event>();

		CreateMap<Event, EventDTO>()
			.ForMember(d => d.HostUsername, o => o.MapFrom(x => x.Attendees.FirstOrDefault(
						u => u.IsHost).AppUser.UserName));

		// This is what will be included for attendees inside an event response
		CreateMap<EventAttendee, AttendeeDTO>()
			.ForMember(d => d.DisplayName, o => o.MapFrom(x => x.AppUser.DisplayName))
			.ForMember(d => d.Username, o => o.MapFrom(x => x.AppUser.UserName))
			.ForMember(d => d.Bio, o => o.MapFrom(x => x.AppUser.Bio))
			.ForMember(d => d.Image, o => o.MapFrom(x => x.AppUser.Photos.FirstOrDefault(p => p.IsMain).Url));

		CreateMap<AppUser, Profiles.Profile>()
			.ForMember(d => d.Image, o => o.MapFrom(x => x.Photos.FirstOrDefault(p => p.IsMain).Url));

		CreateMap<Comment, CommentDTO>()
			.ForMember(d => d.DisplayName, o => o.MapFrom(x => x.Author.DisplayName))
			.ForMember(d => d.Username, o => o.MapFrom(x => x.Author.UserName))
			.ForMember(d => d.Image, o => o.MapFrom(x => x.Author.Photos.FirstOrDefault(p => p.IsMain).Url));
			
	}

}




// PRIOR TO USING AttendeeDTO
// CreateMap<EventAttendee, Profiles.Profile>()
// 			.ForMember(d => d.DisplayName, o => o.MapFrom(x => x.AppUser.DisplayName))
// 			.ForMember(d => d.Username, o => o.MapFrom(x => x.AppUser.UserName))
// 			.ForMember(d => d.Bio, o => o.MapFrom(x => x.AppUser.Bio));
