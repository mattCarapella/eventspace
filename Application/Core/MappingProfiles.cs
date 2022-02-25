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
		CreateMap<EventAttendee, Profiles.Profile>()
			.ForMember(d => d.DisplayName, o => o.MapFrom(x => x.AppUser.DisplayName))
			.ForMember(d => d.Username, o => o.MapFrom(x => x.AppUser.UserName))
			.ForMember(d => d.Bio, o => o.MapFrom(x => x.AppUser.Bio));
	
	}

}
