import React, { useEffect, useState } from "react";
import TagCard from "./TagCard";
import { getAllTags } from "../../modules/tagManager";

export const TagList = () => {
    const [tags, setTags] = useState([]);

    const getTags = () => {
        getAllTags().then(tags => setTags(tags));
    }
    useEffect(() => {
        getTags();
    }, []);

    return (
        <div>
            <div>{tags.map(tag => <TagCard key={tag.id} tag={tag} />)}</div>
        </div>
    )
}
export default TagList;