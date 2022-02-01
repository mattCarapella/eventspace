namespace API;

public class Program
{
    public static async Task Main(string[] args)    // Task represents an asynchronous operation
    {   
        // When application starts, check to see if a DB exists and if not create one and apply migrations. 
        var host = CreateHostBuilder(args).Build();
        // 'using' keyword disposes of the object upon completion of the method.
        using var scope = host.Services.CreateScope();  
        var services = scope.ServiceProvider;

        try
        {
            var context = services.GetRequiredService<DataContext>();  // This was added as a service in Startup.cs
            // Migrate database (Migrate() also creates a DB if one does not exist) and seed data upon initial start up. 
            await context.Database.MigrateAsync();     
            await Seed.SeedData(context);
        }
        catch (Exception ex)
        {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "An error occurred during migration.");
        }

        // Start application
        await host.RunAsync();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
}