import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import classes from "./style.module.css";
import ClosedEyeIcon from "../../Icons/ClosedEyeIcon";
import OpenEyeIcon from "../../Icons/OpenEyeIcon";

function PasswordField({
  value,
  validationMsg,
  onChange,
  id,
  displayName = "Password",
  minLength = null,
  maxLength = null,
  formSubmitAttempted = false,
  disabled = false,
  autoComplete = null,
}) {
  const ref = useRef(null);
  const [edited, setEdited] = useState(false);
  const [showValidationMsg, setShowValidationMsg] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    if (!validationMsg) {
      ref.current.setCustomValidity("");
      return;
    }
    ref.current.setCustomValidity(validationMsg);
  }, [validationMsg]);

  const handleBlur = () => {
    if (!edited) return;
    setShowValidationMsg(validationMsg ? true : false);
  };

  const handleChange = (e) => {
    setEdited(true);
    onChange(e);
  };

  const handleEyeClick = () => {
    setIsHidden(!isHidden);
  };

  const eyeIcon = isHidden ? (
    <ClosedEyeIcon className={classes.eye} />
  ) : (
    <OpenEyeIcon className={classes.eye} />
  );

  const dispalyValidationMessage =
    showValidationMsg || (formSubmitAttempted && validationMsg);

  const eyeButtonLabel = (isHidden ? "show" : "hide") + " password";
  const type = isHidden ? "password" : "text";

  return (
    <section className={classes.field}>
      <label className={disabled ? classes.disabled : ""} htmlFor={id}>
        {displayName}
      </label>
      <div className={classes["input-wrapper"]}>
        <input
          ref={ref}
          disabled={disabled}
          id={id}
          type={type}
          required
          autoComplete={autoComplete}
          value={value}
          minLength={minLength}
          maxLength={maxLength}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <button
          aria-label={eyeButtonLabel}
          onClick={handleEyeClick}
          type="button"
          className={classes["eye-button"]}
        >
          {eyeIcon}
        </button>
      </div>
      {dispalyValidationMessage && (
        <span className={classes.error}>{validationMsg}</span>
      )}
    </section>
  );
}

PasswordField.propTypes = {
  value: PropTypes.string,
  displayName: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  validationMsg: PropTypes.string,
  autoComplete: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  formSubmitAttempted: PropTypes.bool,
};

export default PasswordField;
