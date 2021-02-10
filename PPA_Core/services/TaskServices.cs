using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using PPA_DB;

namespace PPA_Core {
    public class TaskServices : ITaskServices {
        public AppDbContext _context;
        
        public TaskServices(AppDbContext context) {
            _context = context;
        }

        public List<Task> GetTasks(int id) {
            List<Task> userTasks = new List<Task>();

            foreach (Task task in _context.Tasks) {
                if (task.User_Id == id) {
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

            task.Assign_Date = targetTask.Assign_Date;
            
            _context.Tasks.Remove(targetTask);
            _context.Tasks.Add(task);
            _context.SaveChanges();
            
            return task;
        }

        public Task DeleteTask(int id) {
            var deletedTask = _context.Tasks.FirstOrDefault(tempTask => tempTask.Id == id);
            
            _context.Tasks.Remove(deletedTask);
            _context.SaveChanges();
            
            return deletedTask;
        }
    }
}