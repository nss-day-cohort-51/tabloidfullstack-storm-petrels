import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

export const TagCard = ({ tag }) => {
    const history = useHistory();

    const handleDeleteTag = () => {
        history.push(`/deleteTag/${tag.id}`)
    };

    return (
        < Card >
            <CardBody>
                <p>Tag Name : {tag.name}</p>
                <button className="remove_button" type="button" onClick={() => handleDeleteTag(tag.id)}>Remove</button>
            </CardBody>
        </Card >
    )
}
export default TagCard;