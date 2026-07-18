// src/firebase/firebaseConfig.js

// Import the core Firebase app initializer
import { initializeApp } from "firebase/app";

// Import the specific services we need
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config, pulled from our .env file (never hardcoded)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize the Firebase app with our config
const app = initializeApp(firebaseConfig);

// Create and export instances of each service
// so the rest of our app can import them directly
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);