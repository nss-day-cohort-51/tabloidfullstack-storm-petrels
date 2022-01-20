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
            if (res.ok) {
                return res.json()
            } else {
                throw new Error("An error occurred while retrieving categories")
            }
        })
    })
}