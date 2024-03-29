import axios from "axios";

axios.defaults.withCredentials = true
const url = import.meta.env.VITE_LOCAL_URL

export async function fetchStoreById(store_id) {
    return await axios.get(`${url}store/${store_id}`)
}

export async function fetchStores() {

    return await axios.get(`${url}stores`)
    
}

export async function onRegistrationStore(registrationData) {
  
    return await axios.post(
      `${url}register-store`,
      registrationData
    )
  }