using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Backend {
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectPointsController : Controller {
        private readonly ILogger<TasksController> _logger;
        private IProjectPointServices _projectPointServices;
        
        public ProjectPointsController(ILogger<TasksController> logger, IProjectPointServices projectPointServices) {
            _logger = logger;
            _projectPointServices = projectPointServices;
        }
        
        [HttpGet("{id}")]
        public IActionResult GetProjectPoints(int id) {
            return Ok(_projectPointServices.GetProjectPoints(id));
        }
        
        [HttpPost("create")]
        public IActionResult CreateProjectPoints(List<ProjectPoint> projectPoints) {
            return Ok(_projectPointServices.CreateProjectPoints(projectPoints));
        }

        [HttpPost("update")]
        public IActionResult UpdateProjectPoints(List<ProjectPoint> projectPoints) {
            return Ok(_projectPointServices.UpdateProjectPoints(projectPoints));
        }
    }
}