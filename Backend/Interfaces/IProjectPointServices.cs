using System.Collections.Generic;

namespace Backend {
    public interface IProjectPointServices {
        List<ProjectPoint> GetProjectPoints(int id);
        List<ProjectPoint> CreateProjectPoints(List<ProjectPoint> projectPoints);
        List<ProjectPoint> UpdateProjectPoints(List<ProjectPoint> projectPoints);
    }
}