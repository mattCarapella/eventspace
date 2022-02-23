using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
	private readonly UserManager<AppUser> _userManager;
	private readonly SignInManager<AppUser> _signInManager;
	private readonly TokenService _tokenService;

	public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, 
		TokenService tokenService)
	{
		_tokenService = tokenService;
		_signInManager = signInManager;
		_userManager = userManager;
	}

	[AllowAnonymous]
	[HttpPost("login")]
	public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
	{
		// Gets the user, if any, associated with the normalized value of the specified email address. Note: Its 
		// recommended that identityOptions.User.RequireUniqueEmail be set to true when using this method, otherwise 
		// the store may throw if there are users with duplicate emails.
		var user = await _userManager.FindByEmailAsync(loginDTO.Email);

		// If user email is not found return 401 response, else sign in using password from LoginDTO.
		if (user == null) return Unauthorized();
		var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);

		// Sends back user data as UserDTO if user is found and authorized, otherwise a 401 response. The
		// token is created in Services/TokenService.cs
		if (result.Succeeded)
		{
			return new UserDTO
			{
				DisplayName = user.DisplayName,
				Image = null,
				Token = _tokenService.CreateToken(user),
				Username = user.UserName
			};
		}
		return Unauthorized();
	}

}
