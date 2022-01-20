using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
       
        private readonly ICommentRepository _commentRepository;
        public CommentController(ICommentRepository commentRepository)
        {
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

       
    }
}
