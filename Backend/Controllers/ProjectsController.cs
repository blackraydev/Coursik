using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Backend {
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : Controller {
        private readonly ILogger<TasksController> _logger;
        private IProjectServices _projectServices;
        
        public ProjectsController(ILogger<TasksController> logger, IProjectServices projectServices) {
            _logger = logger;
            _projectServices = projectServices;
        }
        
        [HttpGet("{id}")]
        public IActionResult GetProjects(int id) {
            return Ok(_projectServices.GetProjects(id));
        }
        
        [HttpPost("create")]
        public IActionResult CreateProject(Project project) {
            return Ok(_projectServices.CreateProject(project));
        }
        
        [HttpDelete("{id}")]
        public IActionResult DeleteProject(int id) {
            return Ok(_projectServices.DeleteProject(id));
        }

        [HttpPost("update")]
        public IActionResult UpdateProject(Project project) {
            return Ok(_projectServices.UpdateProject(project));
        }
    }
}