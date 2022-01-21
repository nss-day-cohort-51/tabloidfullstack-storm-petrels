import { getToken } from "./authManager";

const baseUrl = "/api/tag";

export const getAllTags = () => {
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
                throw new Error("An error occured while retrieving tags")
            }
        })
    })
}

export const addTag = (newTag) => {
    return getToken().then(token => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTag)
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error("An error occured when creating a tag")
            }
        })
    })
}

export const deleteTag = (id) => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
    })
}

export const updateTag = (tag) => {
    return fetch(`${baseUrl}/${tag.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tag),
    });
};

export const getTag = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
};
