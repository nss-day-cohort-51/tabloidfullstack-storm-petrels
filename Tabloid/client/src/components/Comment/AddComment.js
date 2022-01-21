import React, { useState } from "react";
import { useHistory } from "react-router";
import { addComment } from "../../modules/commentManager";
import { useParams } from "react-router-dom";

export const AddComment = () => {
    const history = useHistory();
    const { id } = useParams();
    console.log(id);
    //const parseId = parseInt(id)
    const [comment, setComment] = useState({
        subject: "",
        content: "",
        postId: id,


    });

    const handleControlledInputChange = (event) => {
        const newComment = { ...comment };
        let selectedVal = event.target.value;

        newComment[event.target.id] = selectedVal;

        setComment(newComment);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addComment(comment).then(() => history.push(`/comment/${id}`));
    };

    return (
        <form className="main-content">
            <h2 className="_title">New Comment:</h2>
            <fieldset className="fieldset">
                <div className="form-group">
                    <textarea
                        type="text"
                        id="content"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        rows="6"
                        className="form-control"
                        value={comment.content}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject:</label>
                    <input
                        type="text"
                        id="subject"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        className="form-control"
                        value={comment.subject}
                    />
                </div>
            </fieldset>
            <button className="btn-add-save" onClick={handleSubmit}>
                Submit
            </button>
            <button
                className="btn-add-edit"
                onClick={() => history.push(`/PostDetails/${id}`)}>
                Cancel
            </button>
        </form>
    );

}