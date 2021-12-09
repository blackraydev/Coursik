using Microsoft.EntityFrameworkCore;

namespace Backend {
    public class AppDbContext : DbContext {
        public DbSet<User> Users { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectPoint> ProjectPoints { get; set; }
        
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {
            Database.EnsureCreated();
        }
    }
}