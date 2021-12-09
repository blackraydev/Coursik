using System.Collections.Generic;

namespace Backend {
    public interface IProjectServices {
        Project CreateProject(Project project);
        List<Project> GetProjects(int userId);
        Project UpdateProject(Project project);
        int DeleteProject(int id);
    }
}