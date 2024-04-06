import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId
  };

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

/**
 * 
 * @param {File} file The image to be upload
 * @param {String} folder The folder where save the image
 * @returns {String} Url of saved image
 */
export async function uploadImage(file, folder) {
    const fileName = folder + file.name.toString() + v4();
    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
}