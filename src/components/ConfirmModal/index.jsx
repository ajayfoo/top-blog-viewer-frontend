import PropTypes from "prop-types";
import { forwardRef } from "react";
import classes from "./style.module.css";

const ConfirmModal = forwardRef(function ConfirmModal(
  { message, onCancel, onConfirm },
  ref
) {
  return (
    <dialog onClose={onCancel} ref={ref} className={classes["confirm-modal"]}>
      <form method="dialog">
        <p className={classes.message}>{message}</p>
        <div className={classes["action-buttons"]}>
          <button className={classes.cancel} type="button" onClick={onCancel}>
            Cancel
          </button>
          <button className={classes.confirm} type="button" onClick={onConfirm}>
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
