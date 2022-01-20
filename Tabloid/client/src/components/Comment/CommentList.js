import React, { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { getAllCommentsByPost } from '../../modules/commentManager';

export const CommentList = () => {
    const [comments, setComments] = useState([]);

    const getComments = () => {
        getAllCommentsByPost().then(comments => setComments(comments));
    }
    useEffect(() => {
        getComments();
    }, []);

    return (
        <div>
            <div>{comments.map(comment => <CommentCard key={comment.id} comment={comment} />)}</div>
        </div>
    )
}
export default CommentList;