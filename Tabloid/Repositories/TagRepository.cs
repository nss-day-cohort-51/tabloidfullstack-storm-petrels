using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class TagRepository : BaseRepository, ITagRepository
    {
        public TagRepository(IConfiguration configuration) : base(configuration) { }

        public List<Tag> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name
                                        FROM Tag
                                        ORDER BY Name ASC;";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var tags = new List<Tag>();
                        while (reader.Read())
                        {
                            tags.Add(new Tag()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                            });
                        }
                        return tags;
                    }
                }
            }
        }

        public void Add(Tag tag)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Tag (Name)
                                                     VALUES (@Name)";
                    cmd.Parameters.AddWithValue("@Name", tag.Name);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}


