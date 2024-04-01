import axios from 'axios'
axios.defaults.withCredentials = true
const url = import.meta.env.VITE_LOCAL_URL

export async function onRegistration(registrationData) {
  return await axios.post(
    `${url}register`,
    registrationData
  )
}
export async function onRegistrationStore(registrationData) {
 
  return await axios.post(
    `${url}register-store`,
    registrationData
  )
}

export async function onLogin(loginData) {
  return await axios.post(`${url}login`, loginData)
}

export async function onLoginStore(loginData) {
  
  return await axios.post(`${url}login-store`, loginData)
}

export async function onLogout() {
  return await axios.get(`${url}logout`)
}

export async function fetchProtectedInfo() {
  return await axios.get(`${url}protected`)
}