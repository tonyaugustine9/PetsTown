// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQRyByi5Zp6nu2V02CfbCbLbGI3k8Fis4",

  authDomain: "miniproject-79913.firebaseapp.com",

  projectId: "miniproject-79913",

  storageBucket: "miniproject-79913.appspot.com",

  messagingSenderId: "788897092832",

  appId: "1:788897092832:web:902d3d0b57a1b05d246c85",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
