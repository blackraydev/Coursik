using System.ComponentModel.DataAnnotations;

namespace PPA_DB {
    public class User {
        [Key]
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}