using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class DataContext : IdentityDbContext<AppUser> 
{
	// DbContext instance represents a session with the DB and can be used to query and save instances of entities.
  	// Typically, you create a class that derives from DbContext and contains DbSet<Entity> properties for each entity in the model.
	// Entities with public setters are automatically initialized when the instance of the derived context is created.
  
	public DataContext(DbContextOptions options) : base(options)
	{

	}


	// Database table. DbSet takes a param of type of prop. Requires Domain namespace. Name reflects name of db table. Contains columns that match names of props in Activity.cs.
	// If DbSet<TEntity> properties have a public setter, they're automatically initialized when the instance of the derived context is created.
	public DbSet<Event> Events { get; set; }
	public DbSet<EventAttendee> EventAttendees { get; set; }

	// Overrides OnModelCreating method from IdentityDbContext
	protected override void OnModelCreating(ModelBuilder builder)
	{
		base.OnModelCreating(builder);

		// Forms primary key in join table
		builder.Entity<EventAttendee>(x => x.HasKey(ea => new{ea.AppUserId, ea.EventId}));

		// Configure many-to-many relationship between Event and AppUser
		builder.Entity<EventAttendee>()
			.HasOne(e => e.AppUser)
			.WithMany(u => u.Events)
			.HasForeignKey(ea => ea.AppUserId);

		builder.Entity<EventAttendee>()
			.HasOne(e => e.Event)
			.WithMany(u => u.Attendees)
			.HasForeignKey(ea => ea.EventId);
	}

} 
