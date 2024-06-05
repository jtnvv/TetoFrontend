import axios from "axios";

axios.defaults.withCredentials = true
const url = import.meta.env.VITE_LOCAL_URL

export async function getPaymentLink(order) {
    return await axios.post(`${url}get-payment-link`, order)
}

export async function updateOrderRating(order) {
    return await axios.post(`${url}update-order-rating`, order)
}

export async function userCancelOrder(data) {

    return await axios.delete(`${url}delete-order/${data.id}`);
}

export async function sendCancelOrderEmail(data) {
    return await axios.post(`${url}send_cancel_order__email`, data)
};

export async function userRefundOrder(data) {

    return await axios.post(`${url}update-order-refund`, data);
}

export async function sendRefundOrderEmail(data) {

    return await axios.post(`${url}send-refund-order-email`, data)
};

export async function sendContact(data) {
    return await axios.post(`${url}send-email-contact`, data)
};