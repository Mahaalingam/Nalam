// src/App.jsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import PreConsultationForm from "./pages/PreConsultationForm";
import SummaryPage from "./pages/SummaryPage";
import PatientDetailPage from "./pages/PatientDetailPage";
import PatientHistoryPage from "./pages/PatientHistoryPage";
import PatientProfilePage from "./pages/PatientProfilePage";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import SettingsPage from "./pages/SettingsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute allowedRole="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRole="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pre-consultation"
          element={
            <ProtectedRoute allowedRole="patient">
              <PreConsultationForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/summary"
          element={
            <ProtectedRoute allowedRole="patient">
              <SummaryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book-appointment"
          element={
            <ProtectedRoute allowedRole="patient">
              <BookAppointmentPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/summary/:appointmentId"
          element={
            <ProtectedRoute>
              <SummaryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient-detail/:appointmentId"
          element={
            <ProtectedRoute allowedRole="doctor">
              <PatientDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient-history"
          element={
            <ProtectedRoute allowedRole="patient">
              <PatientHistoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient-profile"
          element={
            <ProtectedRoute allowedRole="patient">
              <PatientProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor-profile"
          element={
            <ProtectedRoute allowedRole="doctor">
              <DoctorProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<h1>404 — Page Not Found</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;