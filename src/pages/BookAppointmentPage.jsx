// src/pages/BookAppointmentPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { getAllDoctors } from "../services/doctorService";
import { bookAppointment } from "../services/appointmentService";
import Loader from "../components/Loader";
import "../css/booking.css";

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
];

function BookAppointmentPage() {
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  // Fetch all doctors once when the page loads
  useEffect(() => {
    async function loadDoctors() {
      const data = await getAllDoctors();
      setDoctors(data);
      setLoadingDoctors(false);
    }
    loadDoctors();
  }, []);

  // Derive dropdown options FROM the doctors list, instead of hardcoding them.
  // This means adding a new doctor in Firestore automatically updates this form.
  const hospitals = [...new Set(doctors.map((doc) => doc.hospital))];

  const departments = [
    ...new Set(
      doctors
        .filter((doc) => doc.hospital === selectedHospital)
        .map((doc) => doc.department)
    ),
  ];

  const filteredDoctors = doctors.filter(
    (doc) => doc.hospital === selectedHospital && doc.department === selectedDepartment
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const doctor = doctors.find((doc) => doc.id === selectedDoctorId);

      const appointmentId = await bookAppointment({
        patientId: currentUser.uid,
        patientName: currentUser.name,
        doctorId: doctor.id,
        doctorName: doctor.name,
        hospital: selectedHospital,
        department: selectedDepartment,
        date,
        timeSlot,
      });

      showToast("Appointment booked! Let's fill your pre-consultation form.", "success");
      navigate(`/pre-consultation/${appointmentId}`);
    } catch (err) {
      showToast("Failed to book appointment. Please try again.", "error");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingDoctors) return <Loader fullScreen />;

  return (
    <div className="booking-page">
      <div className="booking-card">
        <h1>Book an Appointment</h1>
        <p>Choose your hospital, department, doctor, and preferred time.</p>

        <form onSubmit={handleSubmit}>
          <label>Hospital</label>
          <select
            value={selectedHospital}
            onChange={(e) => {
              setSelectedHospital(e.target.value);
              setSelectedDepartment("");
              setSelectedDoctorId("");
            }}
            required
          >
            <option value="">Select a hospital</option>
            {hospitals.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>

          <label>Department</label>
          <select
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              setSelectedDoctorId("");
            }}
            disabled={!selectedHospital}
            required
          >
            <option value="">Select a department</option>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <label>Doctor</label>
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            disabled={!selectedDepartment}
            required
          >
            <option value="">Select a doctor</option>
            {filteredDoctors.map((doc) => (
              <option key={doc.id} value={doc.id}>{doc.name}</option>
            ))}
          </select>

          <label>Date</label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label>Time Slot</label>
          <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required>
            <option value="">Select a time slot</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>

          <button type="submit" disabled={submitting}>
            {submitting ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookAppointmentPage;