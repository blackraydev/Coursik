﻿using System;
using Microsoft.EntityFrameworkCore;

namespace PPA_DB {
    public class AppDbContext : DbContext {
        public DbSet<User> Users { get; set; }
        public DbSet<Task> Tasks { get; set; }

        public AppDbContext() {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            optionsBuilder.UseMySql(
                "server=localhost;user=root;password=89372908085hfvbkm;database=ppa;",
                new MySqlServerVersion(new Version(8, 0, 11))
            );
        }
    }
}