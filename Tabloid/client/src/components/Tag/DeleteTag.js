import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllTags, deleteTag } from "../../modules/tagManager";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const DeleteTag = () => {
    const [tag, setTag] = useState({
        name: "",
    });

    const { id } = useParams();

    const history = useHistory();

    const handleConfirmDeleteTag = (event) => {
        event.preventDefault();

        deleteTag(id).then(() => history.push("/tag"));
    };

    return (
        <form>
            <h2> Delete Tag:</h2>
            <p>Are you sure you want to delete this tag?</p>
            <button onClick={handleConfirmDeleteTag}>Delete</button>
            <button onClick={() => history.push("/tag")}>Cancel</button>
        </form>
    );
};

export default DeleteTag;