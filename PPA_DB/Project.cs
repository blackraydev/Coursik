using System.ComponentModel.DataAnnotations;

namespace PPA_DB {
    public class Project {
        [Key]
        public int Id { get; set; }
        public int User_Id { get; set; }
        public int Template_Id { get; set; }
        public string Name { get; set; }
        public string Privacy { get; set; }
    }
}