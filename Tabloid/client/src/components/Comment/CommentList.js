import React, { useEffect, useState, } from "react";
import CommentCard from "./CommentCard";
import { getAllCommentsByPost } from '../../modules/commentManager';
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "reactstrap";
export const CommentList = () => {
    const [comments, setComments] = useState([]);
    const { id } = useParams();
    const history = useHistory();
    const getComments = (id) => {
        getAllCommentsByPost(id).then(comments => setComments(comments));
    }
    useEffect(() => {
        getComments(id);
    }, []);

    if (comments.length === 0) {
        return <div>There are no comments in this post</div>
    }
    return (
        <>

            <div>
                <div>{comments.map(comment => <CommentCard key={comment.id} comment={comment} />)}</div>
                <Button onClick={() => history.push(`/post/${id}`)} >Back to Post</Button>
            </div>
        </>
    )
}
export default CommentList;