// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDywS1jro0Z6FMte5nW02-UUW78xqtw18U",
  authDomain: "authdemo-cb828.firebaseapp.com",
  projectId: "authdemo-cb828",
  storageBucket: "authdemo-cb828.appspot.com",
  messagingSenderId: "735514187180",
  appId: "1:735514187180:web:d1cf03c798c55ee0821609",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
