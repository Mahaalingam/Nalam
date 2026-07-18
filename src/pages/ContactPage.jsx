// src/pages/ContactPage.jsx
import { useState } from "react";
import { useToast } from "../context/ToastContext";
import "../css/contact.css";

function ContactPage() {
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    // NOTE: No email service is wired up yet — this simulates submission
    // for now. See the project's deferred "Email Service" task for the
    // real implementation.
    setTimeout(() => {
      showToast("Message received! We'll get back to you soon.", "success");
      setSubmitted(true);
      setSubmitting(false);
    }, 600);
  }

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-intro">
          <span className="contact-eyebrow">Contact</span>
          <h1>Talk to the Nalam team</h1>
          <p>
            Questions about the platform, partnership inquiries, or feedback —
            we read every message and respond within one to two business days.
          </p>

          <div className="contact-info-list">
            <div className="contact-info-row">
              <span className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-11Z" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </span>
              <div>
                <span className="contact-info-label">Email</span>
                <span className="contact-info-value">support@Nalam.com</span>
              </div>
            </div>

            <div className="contact-info-row">
              <span className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4.5 3h3l2 5-2.5 1.5a11 11 0 0 0 5.5 5.5L14 12.5l5 2v3a2 2 0 0 1-2 2c-8 0-14.5-6.5-14.5-14.5a2 2 0 0 1 2-2Z" />
                </svg>
              </span>
              <div>
                <span className="contact-info-label">Phone</span>
                <span className="contact-info-value">+91 98765 43210</span>
              </div>
            </div>

            <div className="contact-info-row">
              <span className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3.5 2" />
                </svg>
              </span>
              <div>
                <span className="contact-info-label">Hours</span>
                <span className="contact-info-value">Mon – Sat, 9:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-panel">
          {submitted ? (
            <div className="contact-success">
              <span className="contact-success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="m8.5 12.5 2.5 2.5 5-5" />
                </svg>
              </span>
              <h3>Message sent</h3>
              <p>Thanks for reaching out — we'll respond within 1–2 business days.</p>
              <button className="btn-contact-secondary" onClick={() => setSubmitted(false)}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="contact-field-row">
                <div className="contact-field">
                  <label>Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="contact-field">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="contact-field">
                <label>Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  required
                />
              </div>

              <button type="submit" disabled={submitting}>
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactPage;