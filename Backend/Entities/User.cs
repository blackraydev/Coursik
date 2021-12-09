using System.ComponentModel.DataAnnotations;

namespace Backend {
    public class User {
        [Key]
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Avatar { get; set; }
        public string Avatar_Public_Id { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string Patronymic { get; set; }
    }
}