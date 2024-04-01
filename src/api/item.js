import axios from "axios";

axios.defaults.withCredentials = true
const url = import.meta.env.VITE_LOCAL_URL

export async function fetchItemsByStore(store_id) {
    return await axios.get(`${url}get-items-by-store/${store_id}`)
}