import { getToken } from "./authManager";

const baseUrl = "/api/post";

export const getAllPosts = () => {

    return getToken().then(token => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error("An error occurred while retrieving posts")
            }
        })
    })
}

export const addPost = (newPost) => {
    return getToken().then(token => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error("An error occured when creating a post")
            }
        })
    })
}

export const getPostById = (id) => {

    return getToken().then(token => {
        return fetch(baseUrl + `/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error("An error occurred while retrieving the post")
            }
        })
    })
}

export const deletePost = (id) => {   
    
    return getToken().then(token => {
        return fetch(baseUrl + `/${id}`, {
            method: "Delete",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    })
}