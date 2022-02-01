using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class DataContext : DbContext      // This means DataContext is derived from DbContext
{
	// DbContext instance represents a session with the DB and can be used to query and save instances of entities.
  	// Typically, you create a class that derives from DbContext and contains DbSet<Entity> properties for each entity in the model.
	// Entities with public setters are automatically initialized when the instance of the derived context is created.
  
	public DataContext(DbContextOptions options) : base(options)
	{
		// Constructor... base is constructor inside DbContext class we're deriving from
	}


	// Database table. DbSet takes a param of type of prop. Requires Domain namespace. Name reflects name of db table. Contains columns that match names of props in Activity.cs.
	// If DbSet<TEntity> properties have a public setter, they're automatically initialized when the instance of the derived context is created.
	public DbSet<Event> Events { get; set; }

} 
