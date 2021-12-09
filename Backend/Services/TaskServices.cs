using System.Collections.Generic;
using System.Linq;

namespace Backend {
    public class TaskServices : ITaskServices {
        public AppDbContext _context;
        
        public TaskServices(AppDbContext context) {
            _context = context;
        }

        public List<Task> GetTasks(int userId) {
            List<Task> userTasks = new List<Task>();

            foreach (Task task in _context.Tasks) {
                if (task.UserId == userId) {
                    userTasks.Add(task);
                }
            }

            return userTasks;
        }

        public Task CreateTask(Task task) {
            _context.Tasks.Add(task);
            _context.SaveChanges();
            
            return task;
        }

        public Task UpdateTask(Task task) {
            var targetTask = _context.Tasks.FirstOrDefault(tempTask => tempTask.Id == task.Id);

            task.AssignDate = targetTask.AssignDate;
            
            _context.Tasks.Remove(targetTask);
            _context.Tasks.Add(task);
            _context.SaveChanges();
            
            return task;
        }

        public int DeleteTask(int id) {
            var deletedTask = _context.Tasks.FirstOrDefault(tempTask => tempTask.Id == id);
            
            _context.Tasks.Remove(deletedTask);
            _context.SaveChanges();

            return id;
        }

        public List<Task> UpdateTasksStatus(Task[] tasks) {
            foreach (Task task in tasks) {
                var oldTask = _context.Tasks.FirstOrDefault(tempTask => tempTask.Id == task.Id);
                _context.Tasks.Remove(oldTask);
                _context.Tasks.Add(task);
                _context.SaveChanges();
            }

            return tasks.ToList();
        }
    }
}