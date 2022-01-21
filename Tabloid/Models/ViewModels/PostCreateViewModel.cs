using System.Collections.Generic;
using Tabloid.Models;

namespace TabloidMVC.Models.ViewModels
{
    public class PostCreateViewModel
    {
        public Post Post { get; set; }
        public List<Category> CategoryOptions { get; set; }
    }
}