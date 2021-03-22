using System.Collections.Generic;
using PPA_DB;

namespace PPA_Core {
    public interface IProjectPointServices {
        List<ProjectPoint> GetProjectPoints(int id);
        List<ProjectPoint> CreateProjectPoints(List<ProjectPoint> projectPoints);
        List<ProjectPoint> UpdateProjectPoints(List<ProjectPoint> projectPoints);
    }
}