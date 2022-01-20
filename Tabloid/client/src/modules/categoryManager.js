import { getToken } from "./authManager";

const baseUrl = "/api/category";

export const getAllCategories = () => {

    return getToken().then(token => {
        return fetch(baseUrl, {
            method: "Get",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if(res.ok){
                return res.json()
            } else {
                throw new Error("An error occurred while retrieving categories")
            }
        })
    })
}

export const addCategory = (category) => {
    return getToken().then(token => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        })
        // .then(res => {
        //     if (res.ok) {
        //         return res.json();
        //     } else if (res.status === 401) {
        //         throw new Error("Unauthorized");
        //     } else {
        //         throw new Error("An unknown error occurred while trying to create a new category");
        //     }
        // })
    })
}