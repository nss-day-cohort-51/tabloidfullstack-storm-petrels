import React from "react";
import Link from "react-router-dom";
import { Card, CardBody } from "reactstrap";

export const PostCard = ({ post }) => {
    return (
        <Card>
            <CardBody>
                {/* <Link to={`/post/${post.id}`}>
                    <h3>{post.title}</h3>
                </Link> */}
                <h3>{post.title}</h3>
            </CardBody>
            <CardBody>
                <p>{post.userProfile.displayName}</p>
                <p>{post.category.name}</p>
            </CardBody>
        </Card>)
}

export default PostCard;