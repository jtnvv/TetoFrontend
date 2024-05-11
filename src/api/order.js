import axios from "axios";

axios.defaults.withCredentials = true
const url = import.meta.env.VITE_LOCAL_URL

export async function getPaymentLink(order) {
    return await axios.post(`${url}get-payment-link`, order)
}
