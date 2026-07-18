// src/services/preConsultationService.js
//
// Handles saving the Smart Pre-Consultation Form data to Firestore,
// and fetching it back for the AI Summary / Doctor views.

import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Save (or overwrite) the pre-consultation data for a specific appointment.
export async function savePreConsultation(appointmentId, formData) {
  const ref = doc(db, "PreConsultations", appointmentId);
  await setDoc(ref, {
    ...formData,
    appointmentId,
    submittedAt: new Date().toISOString(),
  });
}

// Fetch pre-consultation data for a specific appointment
export async function getPreConsultation(appointmentId) {
  const ref = doc(db, "PreConsultations", appointmentId);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;
  return snapshot.data();
}

// Fetch a single appointment by its ID (used to show doctor/date/hospital
// alongside the pre-consultation details on the Summary page)
export async function getAppointmentById(appointmentId) {
  const ref = doc(db, "Appointments", appointmentId);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}
