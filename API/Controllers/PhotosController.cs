using Application.Photos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class PhotosController : BaseApiController
{
	[AllowAnonymous]
	[HttpGet] 
	public async Task<IActionResult> List()
	{
		return HandleResult(await Mediator.Send(new List.Query()));
	}

	[HttpPost]
	//[FromForm] tells controller to find the form in Add.Command in Application/Photos
	public async Task<IActionResult> Add([FromForm] Add.Command command)
	{
		return HandleResult(await Mediator.Send(command));
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> Delete(string id)
	{
		return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
	}

	[HttpPost("{id}/setMain")]
	public async Task<IActionResult> SetMain(string id)
	{
		return HandleResult(await Mediator.Send(new SetMain.Command{Id = id}));
	}

}
