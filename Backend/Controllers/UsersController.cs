using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Backend {
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase {
        private readonly ILogger<UsersController> _logger;
        private IUserServices _userServices;
        private ITokenServices _tokenServices;

        public UsersController(ILogger<UsersController> logger, IUserServices userServices, ITokenServices tokenServices) {
            _logger = logger;
            _userServices = userServices;
            _tokenServices = tokenServices;
        }

        [HttpPost("login")]
        public IActionResult Login(User user) {
            var loggedUser = _userServices.GetUser(user);

            if (loggedUser == null) {
                return BadRequest();
            }

            var token = _tokenServices.Token(loggedUser);

            return Ok(new { loggedUser, token });
        }

        [HttpPost("register")]
        public IActionResult Register(User user) {
            var newUser = _userServices.CreateUser(user);

            if (newUser == null) {
                return BadRequest();
            }
            
            var token = _tokenServices.Token(newUser);
            
            return Ok(new { newUser, token });
        }

        [HttpPost("update")]
        public IActionResult Update(User user) {
            return Ok(_userServices.UpdateUser(user));
        }
        
        [HttpGet]
        public IActionResult GetUsers() {
            return Ok(_userServices.GetUsers());
        }
        
        [HttpGet("{id}")]
        public IActionResult GetUser(int id) {
            return Ok(_userServices.GetUser(id));
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id) {
            _userServices.DeleteUser(id);
            return Ok($"User with id = {id} has been deleted.");
        }
    }
}