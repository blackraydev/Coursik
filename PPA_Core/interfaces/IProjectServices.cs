using System.Collections.Generic;
using PPA_DB;

namespace PPA_Core {
    public interface IProjectServices {
        Project CreateProject(Project project);
        List<Project> GetProjects(int userId);
        Project UpdateProject(Project project);
        int DeleteProject(int id);
    }
}