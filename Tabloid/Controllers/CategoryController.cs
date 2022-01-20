using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Repositories;
using Tabloid.Models;
using System.Security.Claims;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _catRepo;
        private readonly IUserProfileRepository _userProfRepo;

        public CategoryController(ICategoryRepository catRepo, IUserProfileRepository userProfRepo)
        {
            _catRepo = catRepo;
            _userProfRepo = userProfRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_catRepo.GetAll());
        }

        [HttpPost]
        public IActionResult Post(Category category)
        {

            _catRepo.Add(category);
            return NoContent();
                
        }

       
    }
}
