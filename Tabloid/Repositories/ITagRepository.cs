using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAll();
        void Add(Tag tag);
        void Delete(int id);
        void Update(Tag tag);
        Tag GetTagById(int id);
    }
}