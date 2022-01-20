import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addPost } from "../../modules/postManager";
import { getAllCategories } from "../../modules/categoryManager";
import { useEffect } from "react";

export const PostForm = () => {
    const [post, setPost] = useState({
        title: "",
        content: "",
        categoryId: 0,
        publishDateTime: ""
    });

    const [categories, setCategories] = useState([]);

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newPost = { ...post }
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newPost[event.target.id] = selectedVal
        setPost(newPost)
    }

    useEffect(() => {
        getAllCategories().then((category) => {
            setCategories(category);
        })
    }, []);

    const handleClickSavePost = (event) => {
        event.preventDefault();

        const categoryId = post.categoryId

        if (categoryId === 0) {
            window.alert("please select a category")
        } else {
            addPost(post)
                .then(() => history.push("/"))
        }
    }

    return (
        <>
            <form className="post_form">
                <h3 className="post_form_title">Create a new post</h3>
                <fieldset className="title_fieldset">
                    <div className="form_group">
                        <label htmlFor="title">Title:  </label>
                        <input type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Tite" value={post.title} />
                    </div>
                </fieldset>
                <fieldset className="content_fieldset">
                    <div className="form-group">
                        <label htmlFor="content">What is this post about?</label>
                        <input type="text" id="content" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="post content" value={post.content} />
                    </div>
                </fieldset>
                <fieldset className="content_fieldset">
                    <div className="form-group">
                        <label htmlFor="content">What is today's date?</label>
                        <input type="date" id="publishDateTime" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="date" value={post.publishDateTime} />
                    </div>
                </fieldset>
                <fieldset className="post_fieldset">
                    <div className="form-group">
                        <label htmlFor="category">What category is this post in?  </label>
                        <select value={post.categoryId} name="categoryId" id="categoryId" onChange={handleControlledInputChange} className="form-control" >
                            <option value="0">Select a Category</option>
                            {categories.map(l => (
                                <option key={l.id} value={l.id}>
                                    {l.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <button className="save_post_button"
                    onClick={handleClickSavePost}>
                    Save Post
                </button>
            </form>
        </>
    )
};

export default PostForm;