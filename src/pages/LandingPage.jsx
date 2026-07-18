// src/pages/LandingPage.jsx
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/landing.css";

function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="landing">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">Smart Pre-Consultation Platform</span>
          <h1>
            Walk into your appointment,
            <br />
            <span className="hero-highlight">already understood.</span>
          </h1>
          <p>
            Nalam lets patients share their symptoms, history, and reports
            before the visit — so doctors walk in prepared, and consultations
            take minutes, not guesswork.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn-hero-primary">
              Get Started Free
            </Link>
            <Link to="/login" className="btn-hero-secondary">
              I have an account
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features" id="features">
        <h2>Everything a consultation needs, before it starts</h2>
        <p className="section-subtitle">
          A structured pre-visit form that replaces the rushed first five minutes
          of every appointment.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Smart Intake Form</h3>
            <p>
              Symptoms, duration, pain levels, and medical history — captured
              clearly, structured for doctors to scan in seconds.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📎</div>
            <h3>Document Uploads</h3>
            <p>
              Prescriptions, blood reports, X-rays, and scans — all attached
              to the appointment, ready before you arrive.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🩺</div>
            <h3>Doctor-Ready Summaries</h3>
            <p>
              Every submission is organized into a clean summary doctors can
              review in advance — no more repeating your symptoms twice.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Simple Appointment Booking</h3>
            <p>
              Pick a hospital, department, doctor, and time slot — booking
              takes less than a minute.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="how-it-works" id="how-it-works">
        <h2>How it works</h2>

        <div className="steps">
          <div className="step">
            <span className="step-number">1</span>
            <h3>Book an appointment</h3>
            <p>Choose your hospital, department, doctor, and time.</p>
          </div>

          <div className="step">
            <span className="step-number">2</span>
            <h3>Fill your pre-consultation form</h3>
            <p>Share symptoms, history, and any relevant reports.</p>
          </div>

          <div className="step">
            <span className="step-number">3</span>
            <h3>Meet your doctor, prepared</h3>
            <p>Your doctor reviews everything beforehand — no repeats.</p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="cta">
        <h2>Ready for consultations that actually save time?</h2>
        <p>Join Nalam and prepare for your next visit in minutes.</p>
        <Link to="/register" className="btn-hero-primary">
          Create Your Free Account
        </Link>
      </section>
    </div>
  );
}

export default LandingPage;