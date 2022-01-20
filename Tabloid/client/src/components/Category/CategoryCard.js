import React from "react";
import Link from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import PostCard from "../Post/PostCard";

export const CategoryCard = ({ category }) => {
    return (
        <Card>
            <CardBody>
                <p>{category.name}</p>
            </CardBody>
        </Card>
    )
}

export default PostCard;