// src/pages/DoctorDashboard.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDoctorAppointments, filterTodaysAppointments } from "../services/appointmentService";
import Loader from "../components/Loader";
import "../css/dashboard.css";

function DoctorDashboard() {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("today"); // "today" or "patients"

  useEffect(() => {
    async function loadAppointments() {
      try {
        const data = await getDoctorAppointments(currentUser.uid);
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

  const todaysAppointments = filterTodaysAppointments(appointments);

  // Build a unique patient list from all appointments (avoids duplicate patients
  // if someone has booked multiple visits)
  const uniquePatients = Array.from(
    new Map(appointments.map((appt) => [appt.patientId, appt])).values()
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, Dr. {currentUser?.name}</h1>
          <p>Here's your schedule and patient overview.</p>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button
          className={activeTab === "today" ? "tab active" : "tab"}
          onClick={() => setActiveTab("today")}
        >
          Today's Appointments ({todaysAppointments.length})
        </button>
        <button
          className={activeTab === "patients" ? "tab active" : "tab"}
          onClick={() => setActiveTab("patients")}
        >
          All Patients ({uniquePatients.length})
        </button>
      </div>

      <div className="dashboard-section">
        {loading ? (
          <Loader />
        ) : activeTab === "today" ? (
          todaysAppointments.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🗓️</div>
              <h3>No appointments today</h3>
              <p>You're all clear for today. Check back tomorrow.</p>
            </div>
          ) : (
            <div className="appointments-grid">
              {todaysAppointments.map((appt) => (
                <Link key={appt.id} to={`/patient-detail/${appt.id}`} className="appointment-card">
                  <div className="appointment-status">{appt.status || "Pending"}</div>
                  <h3>{appt.patientName}</h3>
                  <p className="appointment-dept">{appt.department}</p>
                  <p className="appointment-date">{appt.timeSlot}</p>
                </Link>
              ))}
            </div>
          )
        ) : uniquePatients.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>No patients yet</h3>
            <p>Patients will appear here once they book an appointment with you.</p>
          </div>
        ) : (
          <div className="appointments-grid">
            {uniquePatients.map((patient) => (
              <Link key={patient.patientId} to={`/patient-detail/${patient.id}`} className="appointment-card">
                <h3>{patient.patientName}</h3>
                <p className="appointment-dept">Last visit: {patient.date}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorDashboard;