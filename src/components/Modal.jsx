// src/components/Modal.jsx
//
// A reusable popup dialog. Renders nothing if `isOpen` is false.
// Pass any content as children — this component just handles the overlay/box/close behavior.

import "../css/modal.css";

function Modal({ isOpen, onClose, title, children }) {
  // Guard clause: if not open, render nothing at all
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;