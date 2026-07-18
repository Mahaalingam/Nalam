// src/context/ToastContext.jsx
//
// Lets any component trigger a toast notification (success/error message
// that appears briefly, then disappears) without manually managing where it renders.

import { createContext, useContext, useState, useCallback } from "react";
import "../css/toast.css";

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // useCallback keeps this function reference stable across re-renders —
  // useful when passing functions down through Context to avoid unnecessary re-renders.
  const showToast = useCallback((message, type = "success") => {
    const id = Date.now(); // simple unique ID using current timestamp
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove this toast after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}