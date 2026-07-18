// src/context/AuthContext.jsx
//
// This file creates a global "who is logged in" state that any component
// in our app can access — without passing props down manually through every level.

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

// Step 1: Create the Context object itself (an empty "channel" for now)
const AuthContext = createContext();

// Step 2: Create a custom hook so components can easily "tune in" to this channel.
// Instead of writing useContext(AuthContext) everywhere, components just write useAuth().
export function useAuth() {
  return useContext(AuthContext);
}

// Step 3: Create the "Provider" — the component that actually broadcasts the data.
// We'll wrap our entire app in this, in App.jsx.
export function AuthProvider({ children }) {
  // currentUser will hold the logged-in user's info (or null if nobody is logged in)
  const [currentUser, setCurrentUser] = useState(null);

  // loading tells us whether we're still checking Firebase for an existing session.
  // Important: without this, the app might briefly think "nobody is logged in"
  // even if a valid session exists, causing a flash of the login page on every refresh.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged is a Firebase "listener" — it automatically runs
    // every time the login state changes (login, logout, or page refresh).
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // A user is logged in — fetch their role/name from Firestore
        const userDoc = await getDoc(doc(db, "Users", user.uid));
        if (userDoc.exists()) {
          setCurrentUser({ ...user, ...userDoc.data() });
        } else {
          setCurrentUser(user);
        }
      } else {
        // Nobody is logged in
        setCurrentUser(null);
      }
      setLoading(false);
    });

    // Cleanup function: stops listening when this component unmounts,
    // preventing memory leaks
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
  };

  // We only render the app once we know the auth state — this prevents
  // a flash of "logged out" content before Firebase finishes checking
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}