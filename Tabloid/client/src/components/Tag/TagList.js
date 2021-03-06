import React, { useEffect, useState } from "react";
import { TagCard } from "./TagCard";
import { getAllTags, deleteTag, updateTag } from "../../modules/tagManager";
import { useHistory } from "react-router-dom";

export const TagList = () => {
    const [tags, setTags] = useState([]);

    const history = useHistory();

    const getTags = () => {
        return getAllTags().then(tags => {
            setTags(tags)
        });
    };

    const handleDeleteTag = id => {
        deleteTag(id)
            .then(() => getAllTags().then(setTags));
    };

    useEffect(() => {
        getTags();
    }, []);

    return (

        <><section className="section-content">
            <button type="button"
                className="new-tag-button"
                onClick={() => { history.push("/tag/create"); }}>
                Create new Tag
            </button>
        </section><div>
                <div>{tags.map(tag => <TagCard key={tag.id} tag={tag} handleDeleteTag={handleDeleteTag} />)}</div>
            </div></>
    )
}
export default TagList;