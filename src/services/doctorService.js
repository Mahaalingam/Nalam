// src/services/doctorService.js
//
// Fetches doctor data for use in the booking form (hospital/department/doctor dropdowns).

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Fetch all users with role "doctor"
export async function getAllDoctors() {
  const usersRef = collection(db, "Users");
  const q = query(usersRef, where("role", "==", "doctor"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}