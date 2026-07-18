// src/components/FileUpload.jsx
//
// NOTE: Real upload to Firebase Storage is deferred until the project
// upgrades to the Blaze plan (Storage requires it). For now, this component
// captures the selected file's name/type so the UI and data flow are complete —
// see Module 2 for context on this decision.

import "../css/fileUpload.css";

function FileUpload({ label, file, onFileSelect }) {
  function handleChange(e) {
    const selected = e.target.files[0];
    if (selected) {
      onFileSelect(selected);
    }
  }

  return (
    <div className="file-upload">
      <label className="file-upload-label">{label}</label>
      <label className="file-upload-box">
        <input type="file" onChange={handleChange} accept="image/*,.pdf" />
        {file ? (
          <span className="file-upload-filename">📎 {file.name}</span>
        ) : (
          <span className="file-upload-placeholder">Click to select a file</span>
        )}
      </label>
    </div>
  );
}

export default FileUpload;