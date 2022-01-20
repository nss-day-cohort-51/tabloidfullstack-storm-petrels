using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly ICommentRepository _commentRepository;
        public CommentController(ICommentRepository commentRepository,IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
            _commentRepository = commentRepository;
        }

       /* [HttpGet]
        public IActionResult GetAllComments()
        {
            return Ok(_commentRepository.GetAllComments());
        }*/

        // GET api/<CommentController>/5
        [HttpGet("{id}")]
        public IActionResult GetAllCommentsByPost(int id)
        {
            var comments = _commentRepository.GetAllCommentsByPostId(id);
            return Ok(comments);
        }
        [HttpPost]
        public IActionResult AddComment(Comment comment)
        {
            string fireBaseId = GetCurrentUserProfileId();
            var currentUser = _userProfileRepository.GetByFirebaseUserId(fireBaseId);
            comment.UserProfileId = currentUser.Id;
            comment.CreateDateTime = DateTime.Now;
            _commentRepository.Add(comment);
            return CreatedAtAction("Get", new { id = comment.Id },comment);
        }
        private string GetCurrentUserProfileId()
        {
            string id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return id;
        }


    }
}
