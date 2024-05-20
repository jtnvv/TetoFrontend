import axios from "axios";

axios.defaults.withCredentials = true
const url = import.meta.env.VITE_LOCAL_URL

export async function fetchItemsByStore(store_id) {
    return await axios.get(`${url}get-items-by-store/${store_id}`)
}

export async function fetchCategories() {
    return await axios.get(`${url}get-categories`)
}

export async function fetchColors() {
    return await axios.get(`${url}get-colors`)
}

export async function fetchSizes() {
    return await axios.get(`${url}get-sizes`)
}

export async function fetchItemsByCategory(category) {
    return await axios.get(`${url}get-items-by-category/${category}`)
}

export async function storeItem(itemData) {

    return await axios.post(
        `${url}store-item`,
        itemData
    )
}

export async function getItem(itemId) {
    return await axios.get(`${url}product/${itemId}`)
}

export async function fetchItemsByPriority() {
    return await axios.get(`${url}get-items-by-priority`)
}

export async function togleFavorite(itemId) {
    return await axios.post(
        `${url}add-to-favorite`,
        {
            item_id: itemId
        }
    )
}

export async function isFavorite(itemId) {
    return await axios.get(`${url}is-favorite/${itemId}`);
}

export async function getFavorites() {
    return await axios.get(`${url}get-favorites`);
}

export async function updateItemRating(item) {
    return await axios.post(`${url}update-item-rating`, item)
}

export async function updateItem(newItemData) {
    return await axios.post(`${url}update-item`, newItemData)
}

export async function isOwner(itemId) {
    return await axios.get(`${url}is-owner/${itemId}`);
}