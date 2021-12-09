using System.ComponentModel.DataAnnotations;

namespace Backend {
    public class ProjectPoint {
        [Key]
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string Type { get; set; }
        public string Title { get; set; }
        public string Value { get; set; }
    }
}