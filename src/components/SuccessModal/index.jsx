import { forwardRef, useEffect } from "react";
import classes from "./style.module.css";
import PropTypes from "prop-types";
import TickIcon from "../Icons/TickIcon.jsx";

const SuccessModal = forwardRef(function SuccessModal(
  { message, onClose },
  ref
) {
  useEffect(() => {
    ref.current.showModal();
  }, []);
  return (
    <dialog onClose={onClose} className={classes["success-modal"]} ref={ref}>
      <div className={classes.info}>
        <TickIcon className={classes.icon} />
        <p className={classes.message}>{message}</p>
      </div>
      <button onClick={onClose} type="button">
        OK
      </button>
    </dialog>
  );
});

SuccessModal.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
};

export default SuccessModal;
