import PropTypes from "prop-types";
import { forwardRef } from "react";

const ConfirmModal = forwardRef(function ConfirmModal(
  { message, onCancel, onConfirm },
  ref
) {
  return (
    <dialog ref={ref}>
      <form method="dialog">
        <p>{message}</p>
        <div className="action-buttons">
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </form>
    </dialog>
  );
});

ConfirmModal.propTypes = {
  message: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default ConfirmModal;
