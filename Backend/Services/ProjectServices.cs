using System.Collections.Generic;
using System.Linq;

namespace Backend {
    public class ProjectServices : IProjectServices {
        public AppDbContext _context;

        public ProjectServices(AppDbContext context) {
            _context = context;
        }

        public List<Project> GetProjects(int userId) {
            List<Project> userProjects = new List<Project>();
            
            foreach (Project project in _context.Projects) {
                if (project.UserId == userId) {
                    userProjects.Add(project);
                }
            }

            return userProjects;
        }

        public Project CreateProject(Project project) {
            _context.Projects.Add(project);
            _context.SaveChanges();
            
            return project;
        }

        public int DeleteProject(int id) {
            var deletedProject = _context.Projects.FirstOrDefault(tempProject => tempProject.Id == id);

            foreach (ProjectPoint projectPoint in _context.ProjectPoints) {
                if (projectPoint.ProjectId == deletedProject.Id) {
                    _context.ProjectPoints.Remove(projectPoint);
                }
            }

            foreach (Task task in _context.Tasks) {
                if (task.ProjectId == deletedProject.Id) {
                    _context.Tasks.Remove(task);
                }
            }
            
            _context.SaveChanges();
            _context.Projects.Remove(deletedProject);
            _context.SaveChanges();

            return id;
        }

        public Project UpdateProject(Project project) {
            var updatedProject = _context.Projects.FirstOrDefault(prj => prj.Id == project.Id);

            _context.Projects.Remove(updatedProject);
            _context.Projects.Add(project);
            _context.SaveChanges();

            return project;
        }
    }
}