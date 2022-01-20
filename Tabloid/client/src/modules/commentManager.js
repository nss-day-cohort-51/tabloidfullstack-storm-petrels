import { getToken } from "./authManager";

const baseUrl = "/api/comment";

export const getAllCommentsByPost = (id) => {
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
                throw new Error("An error occured while retrieving comments")
            }
        })
    })
}