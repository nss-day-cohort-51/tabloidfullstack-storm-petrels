﻿using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAll();
        Post GetPostById(int id);
        void DeletePost(int id);
    }
}