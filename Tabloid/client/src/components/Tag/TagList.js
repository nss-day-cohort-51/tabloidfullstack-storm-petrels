import React, { useEffect, useState } from "react";
import TagCard from "./TagCard";
import { getAllTags } from "../../modules/tagManager";
import { useHistory } from "react-router-dom";

export const TagList = () => {
    const [tags, setTags] = useState([]);
    const history = useHistory();

    const getTags = () => {
        getAllTags().then(tags => setTags(tags));
    }
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
                <div>{tags.map(tag => <TagCard key={tag.id} tag={tag} />)}</div>
            </div></>
    )
}
export default TagList;