using System.ComponentModel.DataAnnotations;

namespace PPA_DB {
    public class ProjectPoint {
        [Key]
        public int Id { get; set; }
        public int Project_Id { get; set; }
        public string Type { get; set; }
        public string Title { get; set; }
        public string Value { get; set; }
    }
}