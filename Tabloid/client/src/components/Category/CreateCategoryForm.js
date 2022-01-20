import React, { useState } from "react";
import { useHistory } from "react-router";
import {Button, Input} from 'reactstrap';
import { addCategory } from "../../modules/categoryManager";

export const CreateCategory = () => {

    const [category, setCategory] = useState({name: ""})

    const history = useHistory();


    const handleInputChange = (e) => {
        const newCategory = {...category}
        let selectedValue = e.target.value;
        if (e.target.id.includes("Id")) {
            selectedValue = parseInt(selectedValue)
        }
        newCategory[e.target.id] = selectedValue
        setCategory(newCategory)
    }

    const handleClickSave = (e) => {
        e.preventDefault();
        addCategory(category).then(() => history.push("/categories"))
    }


    return (
        <>
            <h3>New Category</h3>
            <div>
                <Input id="name" type="text" onChange={(e) => handleInputChange(e)} required autoFocus placeholder = "Add New Category" value={category.name}/>
                <Button className="category_savebtn" onClick={handleClickSave}>SAVE</Button>
            </div>
        </>
    )
}