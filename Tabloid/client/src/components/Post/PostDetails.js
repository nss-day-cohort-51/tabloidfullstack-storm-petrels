import React from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { useEffect, useState } from "react";
import { getPostById, deletePost } from "../../modules/postManager";
import { useParams, useHistory } from "react-router-dom";


export const PostDetails = () => {

    const history = useHistory();
    const [post, setPost] = useState([]);
    const { id } = useParams();

    const getPost = (id) => {
        getPostById(id).then(setPost);
    }

    useEffect(() => {
        getPost(id);
    }, []);

    if (!post.userProfile) {
        return null;
    }

    return (
        <>
            <ListGroup>
                <ListGroupItem>
                    <h3>{post.title}</h3>
                </ListGroupItem>
                <ListGroupItem>
                    <img src={post.imageLocation} alt="picture" />
                </ListGroupItem>
                <ListGroupItem>
                    <p>{post.content}</p>
                </ListGroupItem>
                <ListGroupItem>
                    <p>{post.createDateTime}</p>
                    <p>Author: {post.userProfile.displayName}</p>
                    <p>Category: {post.category.name}</p>
                </ListGroupItem>
            </ListGroup>
            <div>
                <Button onClick={() => history.push(`/comment/${id}`)}>View Comments</Button>
                <Button onClick={() => history.push("")} >Back to List</Button>
                <Button onClick={() => deletePost(post.id)}>Delete Post</Button>
            </div>
        </>
    )
}
export default PostDetails;