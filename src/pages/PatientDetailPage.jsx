// src/pages/PatientDetailPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAppointmentById, getPreConsultation } from "../services/preConsultationService";
import { saveDoctorNotes, getDoctorNotes, updateAppointmentStatus } from "../services/doctorNotesService";
import { useToast } from "../context/ToastContext";
import Loader from "../components/Loader";
import SummaryCard, { SummaryRow } from "../components/SummaryCard";
import Modal from "../components/Modal";
import "../css/summary.css";
import "../css/patientDetail.css";

function PatientDetailPage() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [appointment, setAppointment] = useState(null);
  const [preConsult, setPreConsult] = useState(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    async function loadData() {
      const [apptData, formData, notesData] = await Promise.all([
        getAppointmentById(appointmentId),
        getPreConsultation(appointmentId),
        getDoctorNotes(appointmentId),
      ]);

      setAppointment(apptData);
      setPreConsult(formData);
      setNotes(notesData?.notes || "");
      setLoading(false);
    }

    loadData();
  }, [appointmentId]);

  async function handleSaveNotes() {
    setSaving(true);
    try {
      await saveDoctorNotes(appointmentId, notes);
      showToast("Notes saved successfully.", "success");
    } catch (err) {
      showToast("Failed to save notes.", "error");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  // This now just opens the confirmation modal instead of updating right away
  function handleMarkCompleteClick() {
    setShowConfirmModal(true);
  }

  // This is the actual update — only runs after the doctor confirms in the modal
  async function confirmMarkComplete() {
    try {
      await updateAppointmentStatus(appointmentId, "Completed");
      setAppointment((prev) => ({ ...prev, status: "Completed" }));
      showToast("Appointment marked as completed.", "success");
    } catch (err) {
      showToast("Failed to update status.", "error");
      console.error(err);
    } finally {
      setShowConfirmModal(false);
    }
  }

  if (loading) return <Loader fullScreen />;

  if (!appointment) {
    return (
      <div className="summary-page">
        <div className="empty-state">
          <h3>Appointment not found</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="summary-page">
      <div className="patient-detail-header">
        <div>
          <h1>{appointment.patientName}</h1>
          <p>
            {appointment.department} • {appointment.date} • {appointment.timeSlot}
          </p>
        </div>
        <span className={`status-badge status-${appointment.status?.toLowerCase()}`}>
          {appointment.status}
        </span>
      </div>

      {!preConsult ? (
        <div className="empty-state">
          <h3>No pre-consultation form submitted</h3>
          <p>This patient hasn't filled out their pre-visit form yet.</p>
        </div>
      ) : (
        <>
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

          <SummaryCard title="Uploaded Documents">
            {preConsult.uploadedFiles &&
              Object.entries(preConsult.uploadedFiles)
                .filter(([, fileName]) => fileName)
                .map(([key, fileName]) => (
                  <SummaryRow key={key} label={key} value={fileName} />
                ))}
          </SummaryCard>

          <SummaryCard title="Questions for Doctor">
            <p className="summary-freetext">
              {preConsult.questionsForDoctor || "No specific questions submitted."}
            </p>
          </SummaryCard>
        </>
      )}

      <div className="summary-card">
        <h3>Consultation Notes</h3>
        <textarea
          className="notes-textarea"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
          placeholder="Add your consultation notes here..."
        />
        <button
          className="btn-summary-primary"
          onClick={handleSaveNotes}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Notes"}
        </button>
      </div>

      <div className="patient-detail-actions">
        <button onClick={() => navigate("/doctor-dashboard")} className="btn-secondary-action">
          Back to Dashboard
        </button>
        {appointment.status !== "Completed" && (
          <button onClick={handleMarkCompleteClick} className="btn-summary-primary">
            Mark as Completed
          </button>
        )}
      </div>

      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Mark appointment as completed?"
      >
        <p className="modal-confirm-text">
          This will mark {appointment.patientName}'s appointment as completed.
          You can still edit your notes afterward, but the status change is visible
          to the patient immediately.
        </p>
        <div className="modal-confirm-actions">
          <button className="btn-secondary-action" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </button>
          <button className="btn-summary-primary" onClick={confirmMarkComplete}>
            Yes, Mark Completed
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default PatientDetailPage;