using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence;
public class Seed
{
    public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
    {
		// Check for users in database to avoid repetition.
		if (!userManager.Users.Any())
		{
			var users = new List<AppUser>
			{
				new AppUser{DisplayName = "Bob", UserName = "bob", Email = "bob@test.com"},
				new AppUser{DisplayName = "Joe", UserName = "joe", Email = "joe@test.com"},
				new AppUser{DisplayName = "Amanda", UserName = "amanda", Email = "amanda@test.com"}
			};

			foreach (var user in users)
			{
				// Creates and saves user. No need to save separately.
				await userManager.CreateAsync(user, "Pa$$w0rd");
			}
		}

        if (context.Events.Any()) return;
        
        var events = new List<Event>
        {
            new Event
            {
                Name = "Eric Prydz",
                Date = DateTime.Now,
				EndDate = DateTime.Now,
                Description = "Eric Prydz, also known by his aliases Pryda and Cirez D among a number of others, is a Swedish DJ, record producer, and musician. He rose to fame with his 2004 hit single \"Call on Me\", and saw continued chart success with \"Proper Education\" in 2007, and \"Pjanoo\" in 2008.",
                Cost = 35.00F,
				CostMax = 110.00F,
                TicketLink = "http://www.eventpage.com",
                Category = "music",
				EventType = null,
                Likes = 0,
                Genre = "Tech House",
                Venue = "Town Ballroom",
                Address = "414 Main St.",
                City = "Buffalo",
                State = "NY",
                Zipcode = "14210",
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
                
            },
            new Event
            {
                Name = "Kundalini Yoga for Beginners",
                Date = DateTime.Now.AddMonths(-1),
                Description = "Register for beginner yoga classes that will focus on unleashing your kundalini all month. Learn, grow, and breathe in a positive group environment where all supplies are provided.",
                Cost = 0.00F,
                TicketLink = "http://www.eventpage.com",
                Category = "fitness",
                Likes = 0,
                Genre = "",
                Venue = "Kali Yoga Studio",
                Address = "124 Highland Ave.",
                City = "Buffalo",
                State = "NY",
                Zipcode = "14222",
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            },
            new Event
            {
                Name = "Buffalo Film Festival",
                Date = DateTime.Now.AddMonths(1),
                Description = "Event 1 month in future",
                Cost = 100.00F,
                TicketLink = "http://www.eventpage.com",
                Category = "film",
                Likes = 0,
                Genre = "",
                Venue = "Shae's",
                Address = "600 Main St.",
                City = "Buffalo",
                State = "NY",
                Zipcode = "14210",
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            },
            new Event
            {
                Name = "Tipper",
                Date = DateTime.Now.AddMonths(2),
                Description = "Event 2 months in future",
                Cost = 50.00F,
                TicketLink = "http://www.eventpage.com",
                Category = "music",
                Likes = 0,
                Genre = "Bass",
                Venue = "Red Rocks",
                Address = "200 Red Rocks Blvd.",
                City = "Denver",
                State = "Co",
                Zipcode = "60054",
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            },
            new Event
            {
                Name = "The Infamous Stringdusters",
                Date = DateTime.Now.AddMonths(3),
                Description = "Event 3 months in future",
                Cost = 20.00F,
                TicketLink = "http://www.eventpage.com",
                Category = "music",
                Likes = 0,
                Genre = "Bluegrass",
                Venue = "Fox Theater",
                Address = "542 Wolf St.",
                City = "Boulder",
                State = "CO",
                Zipcode = "60054",
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            },
            new Event
            {
                Name = "Billy Strings",
                Date = DateTime.Now.AddMonths(4),
                Description = "Event 4 months in future",
                Cost = 25.00F,
                TicketLink = "http://www.eventpage.com",
                Category = "music",
                Likes = 0,
                Genre = "Bluegrass",
                Venue = "Highland Ballroom",
                Address = "224 19th St.",
                City = "New York",
                State = "NY",
                Zipcode = "10011",
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            },
            new Event
            {
                Name = "Silversun Pickups",
                Date = DateTime.Now.AddMonths(5),
                Description = "Event 5 months in future",
                Cost = 25.00F,
                TicketLink = "http://www.eventpage.com",
                Category = "music",
                Likes = 0,
                Genre = "Rock",
                Venue = "Playstation Theater",
                Address = "500 40th St.",
                City = "New York",
                State = "NY",
                Zipcode = "10001",
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            },
            new Event
            {
                Name = "Joe Rogan",
                Date = DateTime.Now.AddMonths(7),
                Description = "Event 2 months ago",
                Cost = 40.00F,
                TicketLink = "http://www.eventpage.com",
                Category = "comedy",
                Likes = 0,
                Genre = "Comedy",
                Venue = "Mando Theater",
                Address = "100 10th Ave.",
                City = "New York",
                State = "NY",
                Zipcode = "10001",
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            }
        };

        await context.Events.AddRangeAsync(events);
        await context.SaveChangesAsync();
    }
}
