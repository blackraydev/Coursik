using Microsoft.AspNetCore.Mvc;

namespace Backend {
    [ApiController]
    [Route("api/[controller]")]
    public class TokenController : Controller {
        private ITokenServices _tokenServices;
        
        public TokenController(ITokenServices tokenServices) {
            _tokenServices = tokenServices;
        }

        [HttpGet]
        public IActionResult Token(User user) {
            return Ok(_tokenServices.Token(user));
        }
    }
}