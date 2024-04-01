// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmNk6HbuL9oOYsppgZHIyEai6ZdgWOZSQ",
  authDomain: "tetofotosdeperfil.firebaseapp.com",
  projectId: "tetofotosdeperfil",
  storageBucket: "tetofotosdeperfil.appspot.com",
  messagingSenderId: "850407252486",
  appId: "1:850407252486:web:0e88a743f494c0a93d1987"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)