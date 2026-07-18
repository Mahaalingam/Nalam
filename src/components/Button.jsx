// src/components/Button.jsx
//
// A reusable button that supports different visual styles (variants)
// and a loading state — instead of rewriting button markup everywhere.

import "../css/button.css";

function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  loading = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn btn-${variant}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

export default Button;