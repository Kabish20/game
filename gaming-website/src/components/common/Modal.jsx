import { useEffect, useRef } from "react";
import { CloseIcon } from "./Icons";

const Modal = ({ open, onClose, children, label = "Dialog" }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-layer" role="presentation">
      <button type="button" className="modal-backdrop" onClick={onClose} aria-label="Close dialog" />
      <div ref={dialogRef} className="modal-panel" role="dialog" aria-modal="true" aria-label={label} tabIndex={-1}>
        <button type="button" onClick={onClose} className="modal-close" aria-label="Close dialog">
          <CloseIcon size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
