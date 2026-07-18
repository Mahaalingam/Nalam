// src/pages/PrivacyPolicyPage.jsx
import "../css/auth.css";

function PrivacyPolicyPage() {
  return (
    <div className="legal-page-plain">
      <h1>Privacy Policy</h1>
      <p className="legal-updated">Last updated: July 2026</p>

      <div className="legal-section">
        <h2>1. Information We Collect</h2>
        <p>
          When you register for Nalam, we collect your name, email address,
          and phone number. When you book an appointment and complete a
          pre-consultation form, we collect the medical information you
          choose to share — including symptoms, medical history, current
          medications, and any documents you upload.
        </p>
      </div>

      <div className="legal-section">
        <h2>2. How We Use Your Information</h2>
        <p>
          Your information is used solely to facilitate your healthcare
          consultations — connecting you with doctors, populating your
          pre-consultation summary, and maintaining your appointment
          history. We do not sell or share your personal or medical
          information with third parties for marketing purposes.
        </p>
      </div>

      <div className="legal-section">
        <h2>3. Who Can Access Your Information</h2>
        <p>
          Your pre-consultation summary is visible to you and to the doctor
          you've booked an appointment with. Doctors can only access
          information tied to their own patients' appointments.
        </p>
      </div>

      <div className="legal-section">
        <h2>4. Data Storage</h2>
        <p>
          Your data is stored securely using Firebase, Google's cloud
          infrastructure platform. Authentication credentials are handled
          entirely by Firebase Authentication and are never stored or
          visible to us directly.
        </p>
      </div>

      <div className="legal-section">
        <h2>5. Your Rights</h2>
        <p>
          You can view, edit, or update your profile information at any
          time from your account settings. If you'd like your account and
          associated data deleted, please contact us using the details on
          our Contact page.
        </p>
      </div>

      <div className="legal-section">
        <h2>6. No Medical Advice</h2>
        <p>
          Nalam is a pre-consultation preparation tool. It does not provide
          medical advice, diagnosis, or treatment recommendations. All
          information submitted is reviewed by a licensed doctor during
          your actual consultation.
        </p>
      </div>

      <div className="legal-section">
        <h2>7. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please reach out
          through our Contact page.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;