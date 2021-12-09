using System.Collections.Generic;
using System.Linq;

namespace Backend {
    public class ProjectPointServices : IProjectPointServices {
        public AppDbContext _context;
        
        public ProjectPointServices(AppDbContext context) {
            _context = context;
        }

        public List<ProjectPoint> GetProjectPoints(int id) {
            List<ProjectPoint> projectPoints = new List<ProjectPoint>();

            foreach (ProjectPoint projectPoint in _context.ProjectPoints) {
                if (projectPoint.ProjectId == id) {
                    projectPoints.Add(projectPoint);
                }
            }

            return projectPoints;
        }

        public List<ProjectPoint> CreateProjectPoints(List<ProjectPoint> projectPoints) {
            foreach (ProjectPoint projectPoint in projectPoints) {
                _context.ProjectPoints.Add(projectPoint);
            }

            _context.SaveChanges();
            return projectPoints;
        }

        public List<ProjectPoint> UpdateProjectPoints(List<ProjectPoint> projectPoints) {
            foreach (ProjectPoint projectPoint in projectPoints) {
                var removedProjectPoint = _context.ProjectPoints.FirstOrDefault(pp => pp.Id == projectPoint.Id);
                _context.ProjectPoints.Remove(removedProjectPoint);
                _context.ProjectPoints.Add(projectPoint);
            }

            _context.SaveChanges();
            return projectPoints;
        }
    }
}