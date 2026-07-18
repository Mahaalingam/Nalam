// src/services/userService.js
//
// Handles reading/updating a user's own profile information
// in the "Users" collection (separate from their Auth credentials).

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Update specific fields on a user's profile document.
// Uses updateDoc (not setDoc) so we only touch the fields being edited —
// same reasoning as updateAppointmentStatus back in Module 12.
export async function updateUserProfile(uid, updates) {
  const ref = doc(db, "Users", uid);
  await updateDoc(ref, updates);
}