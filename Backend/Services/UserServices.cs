using System.Collections.Generic;
using System.Linq;

namespace Backend {
    public class UserServices : IUserServices {
        public AppDbContext _context;
        
        public UserServices(AppDbContext context) {
            _context = context;
        }

        public User CreateUser(User user) {
            var existingUser = _context.Users.FirstOrDefault(tempUser => tempUser.Login == user.Login);

            if (existingUser != null) {
                return null;
            }
            
            _context.Users.Add(user);
            _context.SaveChanges();
                
            return user;
        }

        public User GetUser(User user) {
            var currentUser = _context.Users.FirstOrDefault(tempUser => tempUser.Login == user.Login && tempUser.Password == user.Password);
            return currentUser;
        }
        
        public List<User> GetUsers() {
            return _context.Users.ToList();
        }

        public User GetUser(int id) {
            var user = _context.Users.FirstOrDefault(tempUser => tempUser.Id == id);
            return user;
        }

        public User UpdateUser(User user) {
            var updatedUser = _context.Users.FirstOrDefault(tempUser => tempUser.Id == user.Id);

            _context.Users.Remove(updatedUser);
            _context.Users.Add(user);
            _context.SaveChanges();

            return user;
        }

        public void DeleteUser(int id) {
            var deletedUser =_context.Users.First(user => user.Id == id);
            _context.Users.Remove(deletedUser);
            _context.SaveChanges();
        }
    }
}