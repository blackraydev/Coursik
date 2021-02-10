using System;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PPA_Core;
using PPA_DB;

namespace PPA_API.Controllers {
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
        
        [HttpGet]
        public IActionResult GetUsers() {
            return Ok(_userServices.GetUsers());
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id) {
            _userServices.DeleteUser(id);
            return Ok($"User with id = {id} has been deleted.");
        }
    }
}