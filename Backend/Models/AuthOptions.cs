using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Backend {
    public class AuthOptions {
        public const string ISSUER = "AuthServer";
        public const string AUDIENCE = "AuthClient";
        public const string KEY = "s1e9c2r8e3t7k4e6y5"; 
        public const int LIFETIME = 1;

        public static SymmetricSecurityKey GetSymmetricSecurityKey() {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}