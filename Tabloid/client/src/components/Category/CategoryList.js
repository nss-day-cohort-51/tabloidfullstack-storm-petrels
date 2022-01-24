import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from 'reactstrap';
import { CategoryCard } from "./CategoryCard";
import { getAllCategories } from "../../modules/categoryManager";

export const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const history = useHistory();

    const getCategories = () => {
        getAllCategories().then(categories => setCategories(categories));

    }
    useEffect(() => {
        getCategories();
    }, []);


    return (
        <>
        <section>
            <h1>Categories</h1>
            <div>{categories.map(category => <CategoryCard key = {category.id} category ={category} />)}</div>
        </section>
            <Button id="category_savebtn" onClick={() => history.push("/createCategory")}>
            Create Category
            </Button>
        </>
    )
}

export default CategoryList;