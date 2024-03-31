import axios from 'axios';

const url = import.meta.env.VITE_LOCAL_URL;

export async function storeItem(itemData) {
  return await axios.post(
    `${url}/store-item`,
    itemData
  )
}
