// src/services/appointmentService.js
//
// Handles all Firestore reads/writes related to the "Appointments" collection.

import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// ---------------------------------------------
// Fetch all appointments belonging to a specific patient, most recent first
// ---------------------------------------------
export async function getPatientAppointments(patientId) {
  const appointmentsRef = collection(db, "Appointments");

  const q = query(
    appointmentsRef,
    where("patientId", "==", patientId),
    orderBy("date", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// ---------------------------------------------
// Fetch all appointments assigned to a specific doctor, most recent first
// ---------------------------------------------
export async function getDoctorAppointments(doctorId) {
  const appointmentsRef = collection(db, "Appointments");

  const q = query(
    appointmentsRef,
    where("doctorId", "==", doctorId),
    orderBy("date", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// ---------------------------------------------
// Filter a list of appointments down to just today's date
// ---------------------------------------------
export function filterTodaysAppointments(appointments) {
  const today = new Date().toISOString().split("T")[0]; // "2026-07-14" format
  return appointments.filter((appt) => appt.date === today);
}

// ---------------------------------------------
// Create a new appointment document
// ---------------------------------------------
export async function bookAppointment(appointmentData) {
  const appointmentsRef = collection(db, "Appointments");

  const docRef = await addDoc(appointmentsRef, {
    ...appointmentData,
    status: "Pending",
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}