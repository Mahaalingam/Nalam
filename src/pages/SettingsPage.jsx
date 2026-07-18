// src/pages/SettingsPage.jsx
import { useState } from "react";
import { useToast } from "../context/ToastContext";
import { changePassword } from "../services/authService";
import "../css/profile.css";

function SettingsPage() {
  const { showToast } = useToast();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showToast("New passwords don't match.", "error");
      return;
    }

    if (newPassword.length < 6) {
      showToast("New password must be at least 6 characters.", "error");
      return;
    }

    setSaving(true);
    try {
      await changePassword(currentPassword, newPassword);
      showToast("Password updated successfully.", "success");
      // Clear the form after a successful change — don't leave old values sitting around
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        showToast("Current password is incorrect.", "error");
      } else {
        showToast("Failed to update password. Please try again.", "error");
      }
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>Settings</h1>
        <p>Change your password below.</p>

        <form onSubmit={handleSubmit}>
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />

          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            minLength={6}
            required
          />

          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={6}
            required
          />

          <button type="submit" disabled={saving}>
            {saving ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SettingsPage;