import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { getAllPosts } from '../../modules/postManager';

export const PostList = () => {
    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        getAllPosts().then(posts => setPosts(posts));
    }
    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div>
            <div>{posts.map(post => <PostCard key={post.id} post={post} />)}</div>
        </div>
    )
}
export default PostList;


