using System.Collections.Generic;

namespace Backend {
    public interface ITaskServices {
        List<Task> GetTasks(int userId);
        Task CreateTask(Task task);
        Task UpdateTask(Task task);
        int DeleteTask(int id);
        List<Task> UpdateTasksStatus(Task[] tasks);
    }
}