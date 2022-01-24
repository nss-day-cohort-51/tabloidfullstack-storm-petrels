import React from "react";
import { Card, CardBody } from "reactstrap";

export const CommentCard = ({ comment }) => {
    const getReadableDate = (date) => {
        return new Date(date).toLocaleDateString();
    }
    return (

        <Card>
            <CardBody>
                <p> Subject: {comment.subject}</p>
                <p> Content: {comment.content}</p>
                <p> Author: {comment.userProfile.displayName}</p>
                <p>Creation Date: {getReadableDate(comment.createDateTime)}</p>
            </CardBody>
        </Card>


    )
}
export default CommentCard;