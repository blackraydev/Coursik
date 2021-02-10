using System.Collections.Generic;
using PPA_DB;

namespace PPA_Core {
    public interface ITaskServices {
        List<Task> GetTasks(int id);
        Task CreateTask(Task task);
        Task UpdateTask(Task task);
        Task DeleteTask(int id);
    }
}