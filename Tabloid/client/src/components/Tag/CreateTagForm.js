import React, { useState } from "react";
import { useHistory } from "react-router"
import { addTag } from "../../modules/tagManager";

export const TagForm = () => {
    const [tag, setTag] = useState({
        name: ""
    });

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newTag = { ...tag }
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newTag[event.target.id] = selectedVal
        setTag(newTag)
    }

    const handleClickSaveTag = (event) => {
        event.preventDefault()
        addTag(tag)
            .then(() => history.push("/tag"))
    }

    return (
        <>
            <form className="tag_form">
                <h3 className="tag_form_title">Create a new tag</h3>
                <fieldset className="name_fieldset">
                    <div className="form_group">
                        <label htmlFor="name">Tag name : </label>
                        <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Tag name" value={tag.name} />
                    </div>
                </fieldset>
                <button className="save_tag_button"
                    onClick={handleClickSaveTag}>
                    Save
                </button>
            </form>
        </>
    )
};

export default TagForm;
