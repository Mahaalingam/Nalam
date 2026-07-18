// src/services/doctorNotesService.js
//
// Handles saving/fetching doctor consultation notes, and updating
// appointment status (e.g. marking a visit as "Completed").

import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Save (or overwrite) a doctor's notes for a specific appointment.
// One document per appointment, same pattern as PreConsultations.
export async function saveDoctorNotes(appointmentId, notes) {
  const ref = doc(db, "DoctorNotes", appointmentId);
  await setDoc(ref, {
    notes,
    appointmentId,
    updatedAt: new Date().toISOString(),
  });
}

// Fetch existing doctor notes for an appointment (if any)
export async function getDoctorNotes(appointmentId) {
  const ref = doc(db, "DoctorNotes", appointmentId);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;
  return snapshot.data();
}

// Update just the status field on an existing appointment document
export async function updateAppointmentStatus(appointmentId, newStatus) {
  const ref = doc(db, "Appointments", appointmentId);
  await updateDoc(ref, { status: newStatus });
}