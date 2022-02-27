using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Events.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var activities = new List<Event>
                {
                    new Event
                    {
                        Name = "Eric Prydz",
						Date = DateTime.Now,
						Description = "Eric Prydz, also known by his aliases Pryda and Cirez D among a number of others, is a Swedish DJ, record producer, and musician. He rose to fame with his 2004 hit single \"Call on Me\", and saw continued chart success with \"Proper Education\" in 2007, and \"Pjanoo\" in 2008.",
						Cost = "35.00",
						CostMax = "110.00",
						TicketLink = "http://www.eventpage.com",
						NumberOfTickets = "700",
						Category = "music",
						Genre = "Tech House",
						Venue = "Town Ballroom",
						Address = "414 Main St.",
						City = "Buffalo",
						State = "NY",
						Zipcode = "14210",
						Country = "USA",
                        Attendees = new List<EventAttendee>
                        {
                            new EventAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            }
                        }
                    },
                    new Event
                    {
                        Name = "Kundalini Yoga for Beginners",
						Date = DateTime.Now.AddMonths(-1),
						Description = "Register for beginner yoga classes that will focus on unleashing your kundalini all month. Learn, grow, and breathe in a positive group environment where all supplies are provided.",
						Cost = "0.00",
						TicketLink = "http://www.eventpage.com",
						Category = "Health & Fitness",
						Genre = "",
						Venue = "Kali Yoga Studio",
						Address = "124 Highland Ave.",
						City = "Buffalo",
						State = "NY",
						Zipcode = "14222",
						Country = "USA",
                        Attendees = new List<EventAttendee>
                        {
                            new EventAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new EventAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Event
                    {
                        Name = "Buffalo Film Festival",
						Date = DateTime.Now.AddMonths(1),
						Description = "Three days of feature-length and short films from today's best up-and-coming filmmakers. Over 90 films will be screened.",
						Cost = "25.00",
						CostMax = "110.00",
						TicketLink = "http://www.eventpage.com",
						Category = "film",
						Likes = 0,
						Genre = "",
						Venue = "Shae's",
						Address = "600 Main St.",
						City = "Buffalo",
						State = "NY",
						Zipcode = "14210",
						Country = "USA",
                        Attendees = new List<EventAttendee>
                        {
                            new EventAttendee
                            {
                                AppUser = users[2],
                                IsHost = true
                            },
                            new EventAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Event
                    {
                        Name = "Billy Strings",
						Date = DateTime.Now.AddMonths(4),
						Description = "Billy Strings is an American Grammy Award–winning guitarist and bluegrass musician",
						Cost = "25.00",
						TicketLink = "http://www.eventpage.com",
						NumberOfTickets = "300",
						Category = "music",
						Genre = "Bluegrass",
						Venue = "Highland Ballroom",
						Address = "224 19th St.",
						City = "New York",
						State = "NY",
						Zipcode = "10011",
						Country = "USA",
                        Attendees = new List<EventAttendee>
                        {
                            new EventAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new EventAttendee
                            {
                                AppUser = users[2],
                                IsHost = false
                            },
                        }
                    },
                    new Event
                    {
                        Name = "The Infamous Stringdusters",
						Date = DateTime.Now.AddMonths(3),
						Description = "The Infamous Stringdusters are a progressive acoustic/bluegrass band. The band first emerged in 2006 with the limited release of a five-song extended play CD The Infamous Stringdusters, followed in 2007 by their first album Fork in the Road. Both of these were on Sugar Hill Records.",
						Cost = "20.00",
						TicketLink = "http://www.eventpage.com",
						NumberOfTickets = "200",
						Category = "music",
						Genre = "Bluegrass",
						Venue = "Fox Theater",
						Address = "542 Wolf St.",
						City = "Boulder",
						State = "CO",
						Zipcode = "60054",
						Country = "USA",
                        Attendees = new List<EventAttendee>
                        {
                            new EventAttendee
                            {
                                AppUser = users[1],
                                IsHost = true                            
                            },
                            new EventAttendee
                            {
                                AppUser = users[0],
                                IsHost = false                            
                            },
                        }
                    },
                    new Event
                    {
                        Name = "Joe Rogan",
						Date = DateTime.Now.AddMonths(7),
						Description = "Joseph James Rogan is an American podcaster, Ultimate Fighting Championship color commentator, comedian, actor, and former television presenter. He hosts The Joe Rogan Experience, a podcast that he launched in 2009 in which he discusses topics such as current events, comedy, politics, philosophy, science, and hobbies with a variety of guests.",
						Cost = "35.00",
						CostMax = "90.00",
						TicketLink = "http://www.eventpage.com",
						NumberOfTickets = "350",
						Category = "comedy",
						Venue = "Mando Theater",
						Address = "100 10th Ave.",
						City = "New York",
						State = "NY",
						Zipcode = "10001",
						Country = "USA",
                        Attendees = new List<EventAttendee>
                        {
                            new EventAttendee
                            {
                                AppUser = users[1],
                                IsHost = true                            
                            }
                        }
                    },
                    new Event
                    {
                        Name = "Tipper",
						Date = DateTime.Now.AddMonths(2),
						Description = "Tipper is widely respected as a Surround Sound composer, sound designer & mastering artist. His ground breaking Tip Hop, which focused on merging Hip Hop production with electronic trickery and helped usher in a new genre referred to as Glitch Hop. He's released numerous works that feature vocal glitch sounds that created his signature sound.",
						Cost = "50.00",
						CostMax = "75.00",
						TicketLink = "http://www.eventpage.com",
						NumberOfTickets = "550",
						Category = "music",
						Genre = "Bass",
						Venue = "Red Rocks",
						Address = "200 Red Rocks Blvd.",
						City = "Denver",
						State = "Co",
						Zipcode = "60054",
						Country = "USA",
                        Attendees = new List<EventAttendee>
                        {
                            new EventAttendee
                            {
                                AppUser = users[0],
                                IsHost = true                            
                            },
                            new EventAttendee
                            {
                                AppUser = users[1],
                                IsHost = false                            
                            },
                        }
                    }
                };

                await context.Events.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }
    }
}




// using Domain;
// using Microsoft.AspNetCore.Identity;

// namespace Persistence;
// public class Seed
// {
//     public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
//     {
// 		// Check for users in database to avoid repetition.
// 		if (!userManager.Users.Any() && !context.Events.Any())
// 		{
// 			var users = new List<AppUser>
// 			{
// 				new AppUser{DisplayName = "Bob", UserName = "bob", Email = "bob@test.com"},
// 				new AppUser{DisplayName = "Joe Blow", UserName = "joe", Email = "joe@test.com"},
// 				new AppUser{DisplayName = "Amanda", UserName = "amanda", Email = "amanda@test.com"},
// 				new AppUser{DisplayName = "Tom", UserName = "tom", Email = "tom@test.com"},
// 				new AppUser{DisplayName = "Sarah Garland", UserName = "sarah", Email = "sarah@test.com"},
// 			};

// 			foreach (var user in users)
// 			{
// 				// Creates and saves user. No need to save separately.
// 				await userManager.CreateAsync(user, "Pa$$w0rd");
// 			}
// 		}

//         if (context.Events.Any()) return;
        
//         var events = new List<Event>
//         {
//             new Event
//             {
                // Name = "Eric Prydz",
                // Date = DateTime.Now,
				// EndDate = DateTime.Now,
                // Description = "Eric Prydz, also known by his aliases Pryda and Cirez D among a number of others, is a Swedish DJ, record producer, and musician. He rose to fame with his 2004 hit single \"Call on Me\", and saw continued chart success with \"Proper Education\" in 2007, and \"Pjanoo\" in 2008.",
                // Cost = "35.00F",
				// CostMax = "110.00",
                // TicketLink = "http://www.eventpage.com",
				// NumberOfTickets = "700",
                // Category = "music",
				// EventType = "Concert",
                // Likes = 0,
                // Genre = "Tech House",
                // Venue = "Town Ballroom",
                // Address = "414 Main St.",
                // City = "Buffalo",
                // State = "NY",
                // Zipcode = "14210",
				// Country = "USA",
                // CreatedAt = DateTime.Now,
// 				Attendees = new List<EventAttendee>
//                         {
//                             new EventAttendee
//                             {
//                                 AppUser = users[0]!,
//                                 IsHost = true
//                             }
//                         }
                
//             },
//             new Event
//             {
//                 Name = "Kundalini Yoga for Beginners",
//                 Date = DateTime.Now.AddMonths(-1),
//                 Description = "Register for beginner yoga classes that will focus on unleashing your kundalini all month. Learn, grow, and breathe in a positive group environment where all supplies are provided.",
//                 Cost = "0.00",
//                 TicketLink = "http://www.eventpage.com",
// 				EventType = "Health & Fitness",
//                 Category = "Yoga",
//                 Likes = 0,
//                 Genre = "",
//                 Venue = "Kali Yoga Studio",
//                 Address = "124 Highland Ave.",
//                 City = "Buffalo",
//                 State = "NY",
//                 Zipcode = "14222",
// 				Country = "USA",
//                 CreatedAt = DateTime.Now
//             },
//             new Event
//             {
                // Name = "Buffalo Film Festival",
                // Date = DateTime.Now.AddMonths(1),
                // Description = "Three days of feature-length and short films from today's best up-and-coming filmmakers. Over 90 films will be screened.",
                // Cost = "25.00",
				// CostMax = "110.00",
                // TicketLink = "http://www.eventpage.com",
				// EventType = "Festival",
                // Category = "film",
                // Likes = 0,
                // Genre = "",
                // Venue = "Shae's",
                // Address = "600 Main St.",
                // City = "Buffalo",
                // State = "NY",
                // Zipcode = "14210",
				// Country = "USA",
                // CreatedAt = DateTime.Now
//             },
//             new Event
//             {
//                 Name = "Tipper",
//                 Date = DateTime.Now.AddMonths(2),
//                 Description = "Tipper is widely respected as a Surround Sound composer, sound designer & mastering artist. His ground breaking Tip Hop, which focused on merging Hip Hop production with electronic trickery and helped usher in a new genre referred to as Glitch Hop. He's released numerous works that feature vocal glitch sounds that created his signature sound.",
//                 Cost = "50.00",
// 				CostMax = "75.00",
//                 TicketLink = "http://www.eventpage.com",
// 				NumberOfTickets = "550",
// 				EventType = "Concert",
//                 Category = "music",
//                 Likes = 0,
//                 Genre = "Bass",
//                 Venue = "Red Rocks",
//                 Address = "200 Red Rocks Blvd.",
//                 City = "Denver",
//                 State = "Co",
//                 Zipcode = "60054",
// 				Country = "USA",
//                 CreatedAt = DateTime.Now
//             },
//             new Event
//             {
//                 Name = "The Infamous Stringdusters",
//                 Date = DateTime.Now.AddMonths(3),
//                 Description = "The Infamous Stringdusters are a progressive acoustic/bluegrass band. The band first emerged in 2006 with the limited release of a five-song extended play CD The Infamous Stringdusters, followed in 2007 by their first album Fork in the Road. Both of these were on Sugar Hill Records.",
//                 Cost = "20.00",
//                 TicketLink = "http://www.eventpage.com",
// 				NumberOfTickets = "200",
// 				EventType = "Concert",
//                 Category = "music",
//                 Likes = 0,
//                 Genre = "Bluegrass",
//                 Venue = "Fox Theater",
//                 Address = "542 Wolf St.",
//                 City = "Boulder",
//                 State = "CO",
//                 Zipcode = "60054",
// 				Country = "USA",
//                 CreatedAt = DateTime.Now
//             },
//             new Event
//             {
//                 Name = "Billy Strings",
//                 Date = DateTime.Now.AddMonths(4),
//                 Description = "Billy Strings is an American Grammy Award–winning guitarist and bluegrass musician",
//                 Cost = "25.00",
//                 TicketLink = "http://www.eventpage.com",
// 				NumberOfTickets = "300",
// 				EventType = "Concert",
//                 Category = "music",
//                 Likes = 0,
//                 Genre = "Bluegrass",
//                 Venue = "Highland Ballroom",
//                 Address = "224 19th St.",
//                 City = "New York",
//                 State = "NY",
//                 Zipcode = "10011",
// 				Country = "USA",
//                 CreatedAt = DateTime.Now
//             },
//             new Event
//             {
//                 Name = "Joe Rogan",
//                 Date = DateTime.Now.AddMonths(7),
//                 Description = "Joseph James Rogan is an American podcaster, Ultimate Fighting Championship color commentator, comedian, actor, and former television presenter. He hosts The Joe Rogan Experience, a podcast that he launched in 2009 in which he discusses topics such as current events, comedy, politics, philosophy, science, and hobbies with a variety of guests.",
//                 Cost = "35.00",
// 				CostMax = "90.00",
//                 TicketLink = "http://www.eventpage.com",
// 				NumberOfTickets = "350",
// 				EventType = "Comedy",
//                 Category = "comedy",
//                 Likes = 0,
//                 Venue = "Mando Theater",
//                 Address = "100 10th Ave.",
//                 City = "New York",
//                 State = "NY",
//                 Zipcode = "10001",
// 				Country = "USA",
//                 CreatedAt = DateTime.Now
//             }
//         };

//         await context.Events.AddRangeAsync(events);
//         await context.SaveChangesAsync();
//     }
// }
