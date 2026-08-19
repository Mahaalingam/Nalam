// src/pages/SummaryPage.jsx
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { getPreConsultation, getAppointmentById } from "../services/preConsultationService";
import Loader from "../components/Loader";
import SummaryCard, { SummaryRow } from "../components/SummaryCard";
import "../css/summary.css";

function SummaryPage() {
  const { appointmentId } = useParams(); // only present on /summary/:appointmentId
  const location = useLocation();
  const navigate = useNavigate();

  const isConfirmation = Boolean(appointmentId);
  const passedData = location.state?.preConsultationData;

  const [appointment, setAppointment] = useState(null);
  const [preConsult, setPreConsult] = useState(isConfirmation ? null : passedData);
  const [loading, setLoading] = useState(isConfirmation);

  useEffect(() => {
    if (!isConfirmation) {
      // Review-before-booking mode: nothing to fetch, data came in via
      // router state. If someone lands here directly (refresh, typed URL,
      // back button after leaving the flow) there's no data to show —
      // send them back to start the form again.
      if (!passedData) navigate("/pre-consultation", { replace: true });
      return;
    }

    // Confirmation mode: appointment + pre-consultation were both saved to
    // Firestore already, so fetch them by appointmentId.
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
  }, [isConfirmation, appointmentId, passedData, navigate]);

  function handleContinue() {
    navigate("/book-appointment", { state: { preConsultationData: passedData } });
  }

  if (loading || !preConsult) return <Loader fullScreen />;

  if (isConfirmation && !preConsult) {
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
        <h1>{isConfirmation ? "Appointment Confirmed" : "Review Your Information"}</h1>
        <p>
          {isConfirmation
            ? "This is a structured overview of the information you submitted."
            : "Please review your details before choosing your appointment slot."}
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
        {isConfirmation ? (
          <Link to="/patient-dashboard" className="btn-summary-primary">
            Back to Dashboard
          </Link>
        ) : (
          <>
            <button onClick={() => navigate(-1)} className="btn-summary-primary">
              Edit
            </button>
            <button onClick={handleContinue} className="btn-summary-primary">
              Continue to Book Appointment
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SummaryPage;