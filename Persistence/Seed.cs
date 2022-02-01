using Domain;

namespace Persistence;
public class Seed
{
    public static async Task SeedData(DataContext context)
    {
        if (context.Events.Any()) return;
        
        var events = new List<Event>
        {
            new Event
            {
                Name = "Eric Prydz",
                Date = DateTime.Now.AddMonths(-2),
                Description = "Event 2 months ago",
                Cost = 35.00F,
                TicketLink = "http://www.eventpage.com",
                Category = "music",
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
                Description = "Event 1 month ago",
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
