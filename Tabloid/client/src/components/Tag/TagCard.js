import React from "react";
import Link from "react-router-dom";
import { Card, CardBody } from "reactstrap";

export const TagCard = ({ tag }) => {
    return (
        < Card >
            <CardBody>
                <p>Tag Name : {tag.name}</p>
            </CardBody>
        </Card >
    )
}
export default TagCard;