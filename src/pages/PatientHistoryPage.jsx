// src/pages/PatientHistoryPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getPatientAppointments } from "../services/appointmentService";
import Loader from "../components/Loader";
import "../css/dashboard.css";

function PatientHistoryPage() {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await getPatientAppointments(currentUser.uid);
        setAppointments(data);
      } catch (err) {
        console.error("Failed to load history:", err);
      } finally {
        setLoading(false);
      }
    }

    if (currentUser) {
      loadHistory();
    }
  }, [currentUser]);

  // Only show completed visits — pending ones belong on the Dashboard instead
  const completedAppointments = appointments.filter(
    (appt) => appt.status === "Completed"
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Consultation History</h1>
          <p>A record of your completed consultations.</p>
        </div>
      </div>

      <div className="dashboard-section">
        {loading ? (
          <Loader />
        ) : completedAppointments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No completed consultations yet</h3>
            <p>Once a doctor marks a visit as completed, it will appear here.</p>
          </div>
        ) : (
          <div className="appointments-grid">
            {completedAppointments.map((appt) => (
              <Link key={appt.id} to={`/summary/${appt.id}`} className="appointment-card">
                <div className="appointment-status status-completed">
                  {appt.status}
                </div>
                <h3>{appt.doctorName}</h3>
                <p className="appointment-dept">{appt.department}</p>
                <p className="appointment-date">
                  {appt.date} • {appt.timeSlot}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientHistoryPage;