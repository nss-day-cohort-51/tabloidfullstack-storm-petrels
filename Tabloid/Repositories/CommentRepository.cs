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
    public class CommentRepository : BaseRepository,ICommentRepository
    {
        public CommentRepository(IConfiguration configuration) : base(configuration) { }



        public List<Comment> GetAllCommentsByPostId(int postId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT c.Id, c.Subject, c.Content, c.PostId,c.UserProfileId, c.CreateDateTime, c.UserProfileId,
                                              p.Id as postId, p.Title, u.DisplayName,
                                          FROM Comment c
                                            Join UserProfile u on c.UserProfileId = u.Id
                                            Join Post p on c.PostId = p.Id
                                         WHERE c.PostId = @postId";
                    cmd.Parameters.AddWithValue("@postId", postId);
                    var reader = cmd.ExecuteReader();
                    List<Comment> comments = new List<Comment>();
                    while (reader.Read())
                    {
                        Comment comment = new Comment()
                        {
                            Subject = reader.GetString(reader.GetOrdinal("subject")),
                            Content = reader.GetString(reader.GetOrdinal("content")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("createDateTime")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserProfile = new UserProfile()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                DisplayName = reader.GetString(reader.GetOrdinal("displayName")),
                            },
                            Post = new Post()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("postId")),
                                Title = reader.GetString(reader.GetOrdinal("title")),
                            }
                        };
                        comments.Add(comment);
                    }

                    reader.Close();

                    return comments;
                }
            }
        }

       /* public List<Comment> GetAllComments()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
               select C.Id, C.PostId, C.UserProfileId, C.Content, C.CreateDateTime, C.Subject, Up.Id, Up.FirebaseUserId, 
                      Up.DisplayName, Up.FirstName, Up.LastName, Up.Email, Up.CreateDateTime UserCreateDateTime, Up.ImageLocation, Up.UserTypeId 
                       from Comment C
                       left join UserProfile Up on Up.Id = C.UserProfileId
            ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var comment = new List<Comment>();
                        while (reader.Read())
                        {
                            comment.Add(new Comment()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                PostId = DbUtils.GetInt(reader, "PostId"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                Subject = DbUtils.GetString(reader, "Subject"),
                                Content = DbUtils.GetString(reader, "Content"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    CreateDateTime = DbUtils.GetDateTime(reader, "UserCreateDateTime"),
                                    ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                                },
                            });
                        }

                        return comment;
                    }
                }
            }
        }

        public void Add(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Comment (
                            Subject, Content, CreateDateTime, PostId, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Subject, @Content, @CreateDateTime, @PostId, @UserProfileId)";
                    cmd.Parameters.AddWithValue("@Subject", comment.Subject);
                    cmd.Parameters.AddWithValue("@Content", comment.Content);
                    cmd.Parameters.AddWithValue("@CreateDateTime", comment.CreateDateTime);
                    cmd.Parameters.AddWithValue("@PostId", comment.PostId);
                    cmd.Parameters.AddWithValue("@UserProfileId", comment.UserProfileId);

                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Comment comment)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"UPDATE Comment
                                        SET Subject = @subject,
                                            Content = @content
                                        WHERE id = @id";

                    cmd.Parameters.AddWithValue("@subject", comment.Subject);
                    cmd.Parameters.AddWithValue("@content", comment.Content);
                    cmd.Parameters.AddWithValue("@id", comment.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
*/






    }
}
