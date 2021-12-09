using System.ComponentModel.DataAnnotations;

namespace Backend {
    public class Project {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TemplateId { get; set; }
        public string Name { get; set; }
        public string Privacy { get; set; }
    }
}