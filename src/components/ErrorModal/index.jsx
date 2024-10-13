import { forwardRef } from "react";
import ErrorIconSrc from "/error.svg";
import classes from "./style.module.css";
import PropTypes from "prop-types";

const ErrorModal = forwardRef(function ErrorModal({ message, onClose }, ref) {
  return (
    <dialog onClose={onClose} className={classes["error-modal"]} ref={ref}>
      <div className={classes.info}>
        <img className={classes["error-icon"]} src={ErrorIconSrc} alt="" />
        <p className={classes.message}>{message}</p>
      </div>
      <button onClick={onClose} type="button">
        OK
      </button>
    </dialog>
  );
});

ErrorModal.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
};

export default ErrorModal;
