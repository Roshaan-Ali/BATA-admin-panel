// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUGEQ2djuF7NNxkqj9kvO7sXxk6Q3HNBU",
  authDomain: "bata-14b76.firebaseapp.com",
  projectId: "bata-14b76",
  storageBucket: "bata-14b76.appspot.com",
  messagingSenderId: "385824149869",
  appId: "1:385824149869:web:a76bd096f8aef66c090a64",
  measurementId: "G-8DWEP0H486",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
