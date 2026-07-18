// src/pages/SummaryPage.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPreConsultation, getAppointmentById } from "../services/preConsultationService";
import Loader from "../components/Loader";
import SummaryCard, { SummaryRow } from "../components/SummaryCard";
import "../css/summary.css";

function SummaryPage() {
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [preConsult, setPreConsult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [apptData, formData] = await Promise.all([
        getAppointmentById(appointmentId),
        getPreConsultation(appointmentId),
      ]);
      setAppointment(apptData);
      setPreConsult(formData);
      setLoading(false);
    }

    loadData();
  }, [appointmentId]);

  if (loading) return <Loader fullScreen />;

  if (!preConsult) {
    return (
      <div className="summary-page">
        <div className="empty-state">
          <h3>No pre-consultation data found</h3>
          <p>This appointment doesn't have a submitted form yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="summary-page">
      <div className="summary-header">
        <h1>Pre-Consultation Summary</h1>
        <p>
          This is a structured overview of the information the patient entered.
          It contains no medical advice or diagnosis — for doctor review only.
        </p>
      </div>

      {appointment && (
        <SummaryCard title="Appointment Details">
          <SummaryRow label="Doctor" value={appointment.doctorName} />
          <SummaryRow label="Department" value={appointment.department} />
          <SummaryRow label="Hospital" value={appointment.hospital} />
          <SummaryRow label="Date" value={appointment.date} />
          <SummaryRow label="Time" value={appointment.timeSlot} />
        </SummaryCard>
      )}

      <SummaryCard title="Personal Information">
        <SummaryRow label="Name" value={preConsult.name} />
        <SummaryRow label="Age" value={preConsult.age} />
        <SummaryRow label="Gender" value={preConsult.gender} />
        <SummaryRow label="Height" value={preConsult.height && `${preConsult.height} cm`} />
        <SummaryRow label="Weight" value={preConsult.weight && `${preConsult.weight} kg`} />
        <SummaryRow label="Blood Group" value={preConsult.bloodGroup} />
        <SummaryRow label="Phone" value={preConsult.phone} />
      </SummaryCard>

      <SummaryCard title="Chief Complaint">
        <p className="summary-freetext">{preConsult.chiefComplaint}</p>
      </SummaryCard>

      <SummaryCard title="Symptoms">
        <SummaryRow label="Reported Symptoms" value={preConsult.symptoms} />
        <SummaryRow label="Duration" value={preConsult.symptomDuration} />
        <SummaryRow label="Pain Level" value={`${preConsult.painLevel} / 10`} />
      </SummaryCard>

      <SummaryCard title="Medical History">
        <SummaryRow label="Existing Conditions" value={preConsult.existingConditions} />
        <SummaryRow label="Current Medicines" value={preConsult.currentMedicines} />
        <SummaryRow label="Allergies" value={preConsult.allergies} />
        <SummaryRow label="Lifestyle" value={preConsult.lifestyle} />
      </SummaryCard>

      {preConsult.uploadedFiles && (
        <SummaryCard title="Uploaded Documents">
          {Object.entries(preConsult.uploadedFiles)
            .filter(([, fileName]) => fileName)
            .map(([key, fileName]) => (
              <SummaryRow key={key} label={key} value={fileName} />
            ))}
          {Object.values(preConsult.uploadedFiles).every((f) => !f) && (
            <p className="summary-freetext">No documents uploaded.</p>
          )}
        </SummaryCard>
      )}

      <SummaryCard title="Questions for Doctor">
        <p className="summary-freetext">
          {preConsult.questionsForDoctor || "No specific questions submitted."}
        </p>
      </SummaryCard>

      <div className="summary-actions">
        <Link to="/patient-dashboard" className="btn-summary-primary">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default SummaryPage;