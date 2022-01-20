import React from "react";
import { Card, CardBody } from "reactstrap";

export const CommentCard = ({ comment }) => {
    return (

        <Card>
            <CardBody>
                <p>{comment.Subject}</p>
                <p>{comment.Content}</p>
                <p>{comment.userProfile.displatName}</p>
            </CardBody>
        </Card>


    )
}
export default CommentCard;