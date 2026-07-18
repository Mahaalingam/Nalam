// src/services/authService.js
//
// This file is our "translation layer" between Firebase Auth and our React app.
// Components never talk to Firebase directly — they call these functions instead.
// This means if we ever swap Firebase for something else, we only edit this ONE file.

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

// ---------------------------------------------
// REGISTER — Patient only (per the project brief, Doctors don't self-register)
// ---------------------------------------------
export async function registerPatient(name, email, password) {
  // Step 1: Create the user in Firebase Authentication (handles password hashing, etc.)
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Step 2: Create a matching profile document in Firestore's "Users" collection.
  await setDoc(doc(db, "Users", user.uid), {
    name,
    email,
    role: "patient",
    createdAt: new Date().toISOString(),
  });

  return user;
}

// ---------------------------------------------
// LOGIN — Works for both Patient and Doctor
// ---------------------------------------------
export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  const userDoc = await getDoc(doc(db, "Users", user.uid));

  if (!userDoc.exists()) {
    throw new Error("No profile found for this account.");
  }

  return { ...user, role: userDoc.data().role, name: userDoc.data().name };
}

// ---------------------------------------------
// LOGOUT
// ---------------------------------------------
export async function logoutUser() {
  await signOut(auth);
}

// ---------------------------------------------
// FORGOT PASSWORD
// ---------------------------------------------
export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

// ---------------------------------------------
// CHANGE PASSWORD — requires re-entering the current password first.
// Firebase requires this "re-authentication" step as a security measure,
// so someone can't change a password just by having access to an
// already-logged-in session (e.g. an unlocked laptop).
// ---------------------------------------------
export async function changePassword(currentPassword, newPassword) {
  const user = auth.currentUser;

  // Build a "credential" object from the user's email + current password,
  // used to prove they still know it before allowing any change
  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  // Re-authenticate: this throws an error if currentPassword is wrong,
  // which stops execution here and skips the update below
  await reauthenticateWithCredential(user, credential);

  // Only reached if re-authentication succeeded
  await updatePassword(user, newPassword);
}