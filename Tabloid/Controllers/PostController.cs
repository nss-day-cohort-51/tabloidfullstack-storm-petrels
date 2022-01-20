using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;
using TabloidMVC.Models.ViewModels;

namespace Tabloid.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {

        private readonly IPostRepository _postRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public PostController(IPostRepository postRepository, ICategoryRepository categoryRepository, IUserProfileRepository userProfileRepository)
        {
            _postRepository = postRepository;
            _categoryRepository = categoryRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAll());
        }

        [Authorize]
        [HttpPost]
        public IActionResult AddPost(Post post)
        {
            var currentUserProfile = GetCurrentUserProfile();
            post.UserProfileID = currentUserProfile.Id;
            post.IsApproved = true;
            post.CreateDateTime = DateTime.Now;
            _postRepository.Add(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpGet("{id}")]
        public IActionResult GetPostById(int id)
        {
            return Ok(_postRepository.GetPostById(id));
        }

    }
}






