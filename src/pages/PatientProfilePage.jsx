// src/pages/PatientProfilePage.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { updateUserProfile } from "../services/userService";
import "../css/profile.css";

function PatientProfilePage() {
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(currentUser?.name || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      await updateUserProfile(currentUser.uid, { name, phone });
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
        <p>Update your personal details below.</p>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Email</label>
          <input value={currentUser?.email || ""} disabled />
          <span className="field-hint">Email cannot be changed here.</span>

          <label>Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Add a phone number"
          />

          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PatientProfilePage;