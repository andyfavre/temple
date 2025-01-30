// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrJ3Kk8TAsSpgi5HosuT1PJb5_D0XVR10",
  authDomain: "founder-s-stone.firebaseapp.com",
  projectId: "founder-s-stone",
  storageBucket: "founder-s-stone.firebasestorage.app",
  messagingSenderId: "1011622091226",
  appId: "1:1011622091226:web:3f97454e48d9908efb48e3",
  measurementId: "G-8PFZ35CFZL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
