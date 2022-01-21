import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

export const TagCard = ({ tag }) => {
    const history = useHistory();

    const handleDeleteTag = () => {
        history.push(`/deleteTag/${tag.id}`)
    };

    const handleUpdateTag = () => {
        history.push(`/editTag/${tag.id}`);
    };

    return (
        < Card >
            <CardBody>
                <p>Tag Name : {tag.name}</p>
                <button className="remove_button" type="button" onClick={() => handleDeleteTag(tag.id)}>Remove</button>
                <button className="update_button" type="button" onClick={() => handleUpdateTag(tag.id)}>Update</button>
            </CardBody>
        </Card >
    )
}
export default TagCard;