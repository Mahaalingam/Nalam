// src/services/contactService.js
//
// Handles saving Contact form submissions to Firestore.

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Save a new contact form submission
export async function submitContactMessage({ name, email, message }) {
  const messagesRef = collection(db, "ContactMessages");

  await addDoc(messagesRef, {
    name,
    email,
    message,
    submittedAt: serverTimestamp(),
  });
}