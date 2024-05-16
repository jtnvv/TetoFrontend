import axios from "axios";


axios.defaults.withCredentials = true
const url = import.meta.env.VITE_LOCAL_URL

export async function fetchStoreById(store_id) {
    return await axios.get(`${url}store/${store_id}`)
}

export async function fetchStores() {

    return await axios.get(`${url}stores`)
    
}

export async function FetchBrandInformation() {
  
  return await axios.get(`${url}storeInformation`)
}

export async function UpdateBrandInformation(data) {
  
  return await axios.post(`${url}updateInformation`,data)
}

export async function deleteItem(data) {
  
  return await axios.delete(`${url}delete-item/${data.id}`);
}

export async function FetchBrandOrders() {
 
  return await axios.get(`${url}fetch-brand-orders`)
}

export async function UpdateSend() {
 
  return await axios.get(`${url}update-send`)
}

export async function storeItem(itemData) {
  return await axios.post(
    `${url}/store-item`,
    itemData
  )
}
