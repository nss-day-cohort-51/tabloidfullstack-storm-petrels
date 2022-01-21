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
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT p.Id, p.Title, p.Content, p.ImageLocation,
		            p.CreateDateTime, p.PublishDateTime, p.IsApproved,
		            p.CategoryId, p.UserProfileId,
                    c.Name as CatName,
		            u.Id AS UserId, u.DisplayName, u.FirstName, u.LastName, u.Email,
		            u.ImageLocation AS UserImage, u.UserTypeId, ut.[Name]
                        FROM    Post p
                        LEFT JOIN Category c 
                        ON p.CategoryId = c.Id
                        LEFT JOIN UserProfile u
                        ON p.UserProfileId = u.Id
                        LEFT JOIN UserType ut
                        ON u.UserTypeId = ut.Id
                        WHERE p.PublishDateTime < GETDATE()
                        AND p.IsApproved = 'true'
                        ORDER BY PublishDateTime desc";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var posts = new List<Post>();
                        while (reader.Read())
                        {
                            posts.Add(new Post()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Content = DbUtils.GetString(reader, "Content"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTIme"),
                                PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                                IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                Category = new Category()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    Name = DbUtils.GetString(reader, "CatName"),
                                },
                                UserProfileID = DbUtils.GetInt(reader, "UserProfileId"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    ImageLocation = DbUtils.GetString(reader, "UserImage"),
                                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                                    UserType = new UserType()
                                    {
                                        Name = DbUtils.GetString(reader, "Name"),
                                        Id = DbUtils.GetInt(reader, "UserTypeId")
                                    }
                                }
                            });
                        }
                        return posts;
                    }
                }
            }
        }

        public void Add(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Post (
                            Title, Content, ImageLocation, CreateDateTime, PublishDateTime,
                            IsApproved, CategoryId, UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Title, @Content, @ImageLocation, @CreateDateTime, @PublishDateTime,
                            @IsApproved, @CategoryId, @UserProfileId )";
                    cmd.Parameters.AddWithValue("@Title", post.Title);
                    cmd.Parameters.AddWithValue("@Content", post.Content);
                    cmd.Parameters.AddWithValue("@ImageLocation", DbUtils.ValueOrDBNull(post.ImageLocation));
                    cmd.Parameters.AddWithValue("@CreateDateTime", post.CreateDateTime);
                    cmd.Parameters.AddWithValue("@PublishDateTime", DbUtils.ValueOrDBNull(post.PublishDateTime));
                    cmd.Parameters.AddWithValue("@IsApproved", post.IsApproved);
                    cmd.Parameters.AddWithValue("@CategoryId", post.CategoryId);
                    cmd.Parameters.AddWithValue("@UserProfileId", post.UserProfileID);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public Post GetPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @$"
                    SELECT p.Id, p.Title, p.Content, p.ImageLocation,
		            p.CreateDateTime, p.PublishDateTime, p.IsApproved,
		            p.CategoryId, p.UserProfileId,
                    c.Name as CatName,
		            u.Id AS UserId, u.DisplayName, u.FirstName, u.LastName, u.Email,
		            u.ImageLocation AS UserImage, u.UserTypeId, ut.[Name]
                        FROM    Post p
                        LEFT JOIN Category c 
                        ON p.CategoryId = c.Id
                        LEFT JOIN UserProfile u
                        ON p.UserProfileId = u.Id
                        LEFT JOIN UserType ut
                        ON u.UserTypeId = ut.Id
                        WHERE p.Id = {id}
                        ORDER BY PublishDateTime desc";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var post = new Post();
                        if (reader.Read())
                        {
                            post = NewPostFromReader(reader);
                        }
                        return post;
                    }
                }
            }
        }

        public void DeletePost(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Post
                                        WHERE id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Post NewPostFromReader(SqlDataReader reader)
        {
            Post post = new Post()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Title = DbUtils.GetString(reader, "Title"),
                Content = DbUtils.GetString(reader, "Content"),
                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTIme"),
                PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                Category = new Category()
                {
                    Id = DbUtils.GetInt(reader, "Id"),
                    Name = DbUtils.GetString(reader, "CatName"),
                },
                UserProfileID = DbUtils.GetInt(reader, "UserProfileId"),
                UserProfile = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "UserId"),
                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    Email = DbUtils.GetString(reader, "Email"),
                    ImageLocation = DbUtils.GetString(reader, "UserImage"),
                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                    UserType = new UserType()
                    {
                        Name = DbUtils.GetString(reader, "Name"),
                        Id = DbUtils.GetInt(reader, "UserTypeId")
                    }
                }
            };
            return post;
        }
    }
}
