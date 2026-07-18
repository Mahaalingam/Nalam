// src/pages/TermsOfServicePage.jsx
import "../css/auth.css";

function TermsOfServicePage() {
  return (
    <div className="legal-page-plain">
      <h1>Terms of Service</h1>
      <p className="legal-updated">Last updated: July 2026</p>

      <div className="legal-section">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By creating an account and using Nalam, you agree to these Terms of
          Service. If you do not agree, please do not use the platform.
        </p>
      </div>

      <div className="legal-section">
        <h2>2. Who Can Use Nalam</h2>
        <p>
          Patient accounts are available to anyone registering with a valid
          email address. Doctor accounts are created and verified by Nalam
          directly and are not available through self-registration.
        </p>
      </div>

      <div className="legal-section">
        <h2>3. Accuracy of Information</h2>
        <p>
          You are responsible for the accuracy of the information you submit,
          including personal details, symptoms, medical history, and any
          documents you upload. Nalam does not verify the medical accuracy of
          patient-submitted information.
        </p>
      </div>

      <div className="legal-section">
        <h2>4. Not a Substitute for Medical Care</h2>
        <p>
          Nalam is a pre-consultation preparation tool only. It does not
          provide medical advice, diagnosis, or treatment, and is not a
          substitute for professional medical care. In a medical emergency,
          contact emergency services immediately rather than using this
          platform.
        </p>
      </div>

      <div className="legal-section">
        <h2>5. Doctor Responsibilities</h2>
        <p>
          Doctors using Nalam are responsible for reviewing patient
          submissions and exercising independent professional judgment.
          Consultation notes entered into the platform are the doctor's own
          professional record and are not verified or edited by Nalam.
        </p>
      </div>

      <div className="legal-section">
        <h2>6. Account Security</h2>
        <p>
          You are responsible for maintaining the confidentiality of your
          login credentials. Notify us immediately if you suspect
          unauthorized access to your account.
        </p>
      </div>

      <div className="legal-section">
        <h2>7. Changes to These Terms</h2>
        <p>
          We may update these Terms of Service from time to time. Continued
          use of Nalam after changes are posted constitutes acceptance of the
          updated terms.
        </p>
      </div>

      <div className="legal-section">
        <h2>8. Contact Us</h2>
        <p>
          If you have questions about these Terms of Service, please reach
          out through our Contact page.
        </p>
      </div>
    </div>
  );
}

export default TermsOfServicePage;