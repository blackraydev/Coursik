using System;
using System.ComponentModel.DataAnnotations;

namespace Backend {
    public class Task {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int? ProjectId { get; set; }
        public string Category { get; set; }
        public int Priority { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime? AssignDate { get; set; }
        public DateTime? DueDate { get; set; }
    }
}