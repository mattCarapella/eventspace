using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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

	[AllowAnonymous]		// Whatever this is applied to does not require authorization
	[HttpPost("login")]
	public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
	{
		// Gets the user, if any, associated with the normalized value of the specified email address. 
		// Note: Its recommended that identityOptions.User.RequireUniqueEmail be set to true when using 
		// this method, otherwise the store may throw if there are users with duplicate emails.
		var user = await _userManager.FindByEmailAsync(loginDTO.Email);

		// If user email is not found return 401 response, else sign in using password from LoginDTO.
		if (user == null) return Unauthorized();
		var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);

		// Sends back user data as UserDTO if user is found and authorized, otherwise a 401 response. 
		// The token is created in Services/TokenService.cs
		if (result.Succeeded)
		{
			return CreateUserObject(user);
		}
		return Unauthorized();
	}

	[AllowAnonymous]
	[HttpPost("signup")]
	public async Task<ActionResult<UserDTO>> SignUp(RegisterDTO registerDTO)
	{
		// Confirm that email and username are not in use
		if (await _userManager.Users.AnyAsync(x => x.NormalizedEmail == registerDTO.Email.ToUpper()))
		{
			//return BadRequest("That email is taken.");
			ModelState.AddModelError("email", "Email is taken.");
			return ValidationProblem();
		}
		if (await _userManager.Users.AnyAsync(x => x.NormalizedUserName == registerDTO.Username.ToUpper()))
		{
			// return BadRequest("That username is taken.");
			ModelState.AddModelError("username", "Username is taken."); 
			return ValidationProblem();
		}

		// Create and save the new user.
		var user = new AppUser{
			DisplayName = registerDTO.DisplayName,
			UserName = registerDTO.Username,
			Email = registerDTO.Email
		};
		var result = await _userManager.CreateAsync(user, registerDTO.Password);

		// Returns UserDTO to log the user in on success or 401 response on failure.
		if (result.Succeeded) {
			return CreateUserObject(user);
		}
		// return BadRequest("Problem registering new user.");
		ModelState.AddModelError("badRequest", "Problem registering new user.");
		return ValidationProblem();
	}

	[Authorize]
	[HttpGet]
	public async Task<ActionResult<UserDTO>> GetCurrentUser()
	{
		// The User passed to FindByEmailAsync() is the System.Security.Claims.ClaimsPrincipal 
		// for user associated with the executing action.
		var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
		return CreateUserObject(user);
	}


	private UserDTO CreateUserObject(AppUser user) 
	{
		return new UserDTO
		{
			DisplayName = user.DisplayName,
			Image = null,
			Token = _tokenService.CreateToken(user),
			Username = user.UserName
		};
	}

}
