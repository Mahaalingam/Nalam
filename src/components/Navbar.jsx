// src/components/Navbar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import "../css/navbar.css";

function Navbar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  async function handleLogout() {
    setDropdownOpen(false);
    await logoutUser();
    navigate("/login");
  }

  function closeDropdown() {
    setDropdownOpen(false);
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Nalam
      </Link>

      <div className="navbar-links">
        {currentUser ? (
          <>
            {currentUser.role === "patient" && (
              <Link to="/pre-consultation" className="navbar-cta">
                + Book Appointment
              </Link>
            )}

            <div className="navbar-profile">
              <button
                className="navbar-profile-trigger"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <span className="navbar-avatar">{currentUser.name?.charAt(0)}</span>
                {currentUser.name}
                <span className="navbar-caret">▾</span>
              </button>

              {dropdownOpen && (
                <>
                  <div className="navbar-dropdown-overlay" onClick={closeDropdown} />

                  <div className="navbar-dropdown">
                    {currentUser.role === "patient" && (
                      <>
                        <Link to="/patient-dashboard" onClick={closeDropdown}>
                          Your Appointments
                        </Link>
                        <Link to="/patient-history" onClick={closeDropdown}>
                          History
                        </Link>
                        <Link to="/patient-profile" onClick={closeDropdown}>
                          Profile
                        </Link>
                      </>
                    )}

                    {currentUser.role === "doctor" && (
                      <Link to="/doctor-profile" onClick={closeDropdown}>
                        Profile
                      </Link>
                    )}

                    <Link to="/settings" onClick={closeDropdown}>
                      Settings
                    </Link>

                    <button onClick={handleLogout} className="navbar-dropdown-logout">
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="navbar-cta">
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;