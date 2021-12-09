using System.Collections.Generic;

namespace Backend {
    public interface IUserServices {
        User CreateUser(User user);
        User GetUser(User user);
        List<User> GetUsers();
        public User GetUser(int id);
        User UpdateUser(User user);
        void DeleteUser(int id);
    }
}