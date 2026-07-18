// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerPatient } from "../services/authService";
import "../css/auth.css";

function RegisterPage() {
  // Form field state — one piece of state per input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI state — tracks loading and error separately from form data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // useNavigate lets us redirect the user programmatically (e.g. after success)
  const navigate = useNavigate();

  async function handleSubmit(e) {
    // Prevents the browser's default full-page-reload form behavior
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await registerPatient(name, email, password);
      // On success, send them to their dashboard
      navigate("/patient-dashboard");
    } catch (err) {
      // Firebase throws descriptive error codes — we show a friendly message
      
  console.log("Firebase error code:", err.code);
  console.log("Firebase error message:", err.message);
  setError("Registration failed. " + err.message);
}
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Your MediPrep Account</h1>
        <p>Register as a patient to book appointments and prepare for consultations.</p>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;