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

export async function onLogout() {
  return await axios.get(`${url}logout`)
}

export async function sendRecoveryEmail(data) {
  return await axios.post(`${url}send_recovery_email`, data)
};

export async function sendConfirmationEmail() {
  return await axios.post(`${url}active-account`)
};

export async function validateCode(code) {
  return await axios.post(`${url}confirm-code`, {
    code: code
  })
};