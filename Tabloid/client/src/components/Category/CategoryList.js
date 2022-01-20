import React, { useEffect, useState } from "react";
import { CategoryCard } from "./CategoryCard";
import { getAllCategories } from "../../modules/categoryManager";

export const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        getAllCategories().then(categories => setCategories(categories));

    }
    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div>
            <div>{categories.map(category => <CategoryCard key = {category.id} category = {category} />)}</div>
        </div>
    )
}

export default CategoryList;