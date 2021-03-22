using System.Collections.Generic;
using PPA_DB;

namespace PPA_Core {
    public interface IUserServices {
        User CreateUser(User user);
        User GetUser(User user);
        List<User> GetUsers();
        public User GetUser(int id);
        User UpdateUser(User user);
        void DeleteUser(int id);
    }
}