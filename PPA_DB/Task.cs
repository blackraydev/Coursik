using System;
using System.ComponentModel.DataAnnotations;

namespace PPA_DB {
    public class Task {
        [Key]
        public int Id { get; set; }
        public int User_Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime? Assign_Date { get; set; }
        public DateTime? Due_Date { get; set; }
    }
}