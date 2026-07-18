// src/pages/PatientDashboard.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getPatientAppointments } from "../services/appointmentService";
import Loader from "../components/Loader";
import "../css/dashboard.css";

function PatientDashboard() {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAppointments() {
      try {
        const data = await getPatientAppointments(currentUser.uid);
        setAppointments(data);
      } catch (err) {
        console.error("Failed to load appointments:", err);
      } finally {
        setLoading(false);
      }
    }

    if (currentUser) {
      loadAppointments();
    }
  }, [currentUser]);

  // Only show appointments that haven't happened yet — completed visits
  // belong in Patient History instead, keeping this page focused on "what's next"
  const pendingAppointments = appointments.filter(
    (appt) => appt.status !== "Completed"
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {currentUser?.name}</h1>
          <p>Here's what's happening with your care.</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Your Upcoming Appointments</h2>

        {loading ? (
          <Loader />
        ) : pendingAppointments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h3>No upcoming appointments</h3>
            <p>Book your first appointment to get started with MediPrep.</p>
            <Link to="/book-appointment" className="btn-dashboard-primary">
              Book Your First Appointment
            </Link>
          </div>
        ) : (
          <div className="appointments-grid">
            {pendingAppointments.map((appt) => (
              <div key={appt.id} className="appointment-card">
                <div className="appointment-status">{appt.status || "Pending"}</div>
                <h3>{appt.doctorName}</h3>
                <p className="appointment-dept">{appt.department}</p>
                <p className="appointment-date">
                  {appt.date} • {appt.timeSlot}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientDashboard;