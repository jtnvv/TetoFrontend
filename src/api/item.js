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