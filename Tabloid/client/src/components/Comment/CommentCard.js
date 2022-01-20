import React from "react";
import { Card, CardBody } from "reactstrap";

export const CommentCard = ({ comment }) => {

    return (

        <Card>
            <CardBody>
                <p> Subject: {comment.subject}</p>
                <p> Content: {comment.content}</p>
                <p> Author: {comment.userProfile.displayName}</p>
                <p>Creation Date {comment.createDateTime}</p>
            </CardBody>
        </Card>


    )
}
export default CommentCard;