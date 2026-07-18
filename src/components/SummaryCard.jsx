// src/components/SummaryCard.jsx
//
// A reusable card for displaying one section of the pre-consultation summary
// (e.g. "Personal Info", "Symptoms"). Keeps the Summary page's JSX clean.

import "../css/summary.css";

function SummaryCard({ title, children }) {
  return (
    <div className="summary-card">
      <h3>{title}</h3>
      <div className="summary-card-content">{children}</div>
    </div>
  );
}

// A small helper for a single "label: value" row inside a SummaryCard
export function SummaryRow({ label, value }) {
  // Don't render anything for genuinely empty values — keeps the summary clean
  if (!value || (Array.isArray(value) && value.length === 0)) return null;

  return (
    <div className="summary-row">
      <span className="summary-label">{label}</span>
      <span className="summary-value">
        {Array.isArray(value) ? value.join(", ") : value}
      </span>
    </div>
  );
}

export default SummaryCard;