using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService
{
	private readonly IConfiguration _config;
	public TokenService(IConfiguration config)
	{
		_config = config;
	}

	// TokenService should be injected into IdentityServiceExtensions and will then be able to be
	// used in AccountController and elsewhere
	public string CreateToken(AppUser user)
	{
		// Create a list of claims (statements about a subject by an issuer) that contains
		// everything a user needs to authenticate (username, id, password)
		var claims = new List<Claim>
		{
			new Claim(ClaimTypes.Name, user.UserName),
			new Claim(ClaimTypes.NameIdentifier, user.Id),
			new Claim(ClaimTypes.Email, user.Email)
		};

		// Define token key and credentials and a descriptor containing all info contained in
		// the token (subject, expiration date, signing credentials, refresh token, etc.)
		var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKeyTest"]));
		var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

		var tokenDescriptor = new SecurityTokenDescriptor
		{
			Subject = new ClaimsIdentity(claims),
			Expires = DateTime.Now.AddDays(7),
			SigningCredentials = creds
			// Add refresh token later
		};

		// Create, validate, and return the token
		var tokenHandler = new JwtSecurityTokenHandler();
		var token = tokenHandler.CreateToken(tokenDescriptor);
		return tokenHandler.WriteToken(token);
	}

}
