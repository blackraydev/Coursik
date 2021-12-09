using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace Backend {
    public class TokenServices : ITokenServices {
        public object Token(User user) {
            var identity = GetIdentity(user);
            
            var now = DateTime.UtcNow;
            
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new {
                accessToken = encodedJwt,
                username = identity.Name
            };

            return response;
        }
        
        private ClaimsIdentity GetIdentity(User user) {
            if (user != null) {
                var claims = new List<Claim> {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login)
                };

                ClaimsIdentity claimsIdentity = new ClaimsIdentity(
                    claims,
                    "Token",
                    ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType
                );

                return claimsIdentity;
            }

            return null;
        }
    }
}