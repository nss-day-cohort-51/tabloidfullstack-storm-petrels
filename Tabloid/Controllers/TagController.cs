﻿using Microsoft.AspNetCore.Http;
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
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tagRepository;
        public TagController(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_tagRepository.GetAll());
        }

        [HttpPost]
        public IActionResult AddTag(Tag tag)
        {
            _tagRepository.Add(tag);
            return CreatedAtAction("Get", new { id = tag.Id }, tag);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _tagRepository.Delete(id);
            return NoContent();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, Tag tag)
        {
            try
            {
                tag.Id = id;
                _tagRepository.Update(tag);

                return RedirectToAction("Index");
            }
            catch
            {
                return View(tag);
            }
        }

        public ActionResult Edit(int id)
        {
            Tag tag = _tagRepository.GetTagById(id);
            return View(tag);
        }

        private ActionResult View(Tag tag)
        {
            throw new NotImplementedException();
        }
    }
}
