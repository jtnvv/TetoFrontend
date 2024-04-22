import axios from 'axios'
axios.defaults.withCredentials = true
const url = import.meta.env.VITE_LOCAL_URL

export async function FetchUserInformation() {
   
    return await axios.get(`${url}userInformation`)
  }

export async function UpdateUserInformation(data) {
  
  return await axios.post(`${url}updateUserInformation`,data)
}

export async function FetchUserOrders() {
 
  return await axios.get(`${url}fetch-user-orders`)
}