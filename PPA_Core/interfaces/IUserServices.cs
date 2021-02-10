using System.Collections.Generic;
using PPA_DB;

namespace PPA_Core {
    public interface IUserServices {
        User CreateUser(User user);
        User GetUser(User user);
        List<User> GetUsers();
        void DeleteUser(int id);
    }
}