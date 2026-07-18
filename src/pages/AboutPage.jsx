// src/pages/AboutPage.jsx
import "../css/about.css";

function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <span className="about-badge">Our Mission</span>
        <h1>Consultations shouldn't start with repeating yourself.</h1>
        <p>
          Nalam was built to close the gap between booking an appointment
          and actually being understood by your doctor.
        </p>
      </div>

      <div className="about-body">
        <section className="about-block">
          <h2>The Problem</h2>
          <p>
            Most first-visit consultations lose their opening minutes to the
            same routine: recalling symptoms under pressure, searching for old
            reports, and explaining a history that's easy to forget mid-sentence.
            That's time taken directly away from diagnosis and care.
          </p>
        </section>

        <section className="about-block">
          <h2>Our Approach</h2>
          <p>
            Nalam lets patients fill out a structured pre-consultation form
            before their visit — symptoms, history, medications, and questions,
            organized clearly. Doctors receive this summary in advance, so the
            appointment itself can start with insight instead of intake.
          </p>
        </section>

        <section className="about-block">
          <h2>What We Don't Do</h2>
          <p>
            Nalam does not diagnose, interpret, or offer medical advice.
            Every summary reflects only what the patient entered — the goal is
            better-prepared conversations, not automated medicine.
          </p>
        </section>
      </div>

      <div className="about-values">
        <div className="about-value-card">
          <h3>Clarity</h3>
          <p>Structured information, not scattered notes or rushed recall.</p>
        </div>
        <div className="about-value-card">
          <h3>Preparation</h3>
          <p>Both sides walk into the room already informed.</p>
        </div>
        <div className="about-value-card">
          <h3>Respect</h3>
          <p>No AI diagnosis — just your information, organized well.</p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;