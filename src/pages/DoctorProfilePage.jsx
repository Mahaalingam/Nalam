// src/pages/DoctorProfilePage.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { updateUserProfile } from "../services/userService";
import "../css/profile.css";

function DoctorProfilePage() {
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(currentUser?.name || "");
  const [hospital, setHospital] = useState(currentUser?.hospital || "");
  const [department, setDepartment] = useState(currentUser?.department || "");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      await updateUserProfile(currentUser.uid, { name, hospital, department });
      showToast("Profile updated successfully.", "success");
    } catch (err) {
      showToast("Failed to update profile.", "error");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>Your Profile</h1>
        <p>Update your professional details below.</p>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Email</label>
          <input value={currentUser?.email || ""} disabled />
          <span className="field-hint">Email cannot be changed here.</span>

          <label>Hospital</label>
          <input value={hospital} onChange={(e) => setHospital(e.target.value)} required />

          <label>Department</label>
          <input value={department} onChange={(e) => setDepartment(e.target.value)} required />

          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DoctorProfilePage;