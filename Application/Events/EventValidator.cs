using Domain;
using FluentValidation;

namespace Application.Events;

public class EventValidator : AbstractValidator<Event>
{
	public EventValidator()
	{
		RuleFor(x => x.Name).NotEmpty();
		RuleFor(x => x.Date).NotEmpty();
		RuleFor(x => x.Description).NotEmpty();
		RuleFor(x => x.Cost).NotEmpty();
		RuleFor(x => x.Category).NotEmpty();
		RuleFor(x => x.Venue).NotEmpty();
		RuleFor(x => x.Address).NotEmpty();
		RuleFor(x => x.City).NotEmpty();
		RuleFor(x => x.State).NotEmpty();
		RuleFor(x => x.City).NotEmpty();
		
	}
}

