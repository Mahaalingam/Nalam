// src/components/Loader.jsx
//
// A simple spinning loader shown while data is being fetched.

import "../css/loader.css";

function Loader({ fullScreen = false }) {
  return (
    <div className={fullScreen ? "loader-fullscreen" : "loader-inline"}>
      <div className="spinner"></div>
    </div>
  );
}

export default Loader;