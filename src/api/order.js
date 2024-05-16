import axios from "axios";

axios.defaults.withCredentials = true
const url = import.meta.env.VITE_LOCAL_URL

export async function getPaymentLink(order) {
    return await axios.post(`${url}get-payment-link`, order)
}

export async function updateOrderRating(order) {
    return await axios.post(`${url}update-order-rating`, order)
}