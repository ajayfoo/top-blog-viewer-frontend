import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import classes from "./style.module.css";

function InputField({
  value,
  validationMsg,
  onChange,
  displayName,
  id,
  minLength = null,
  maxLength = null,
  min = null,
  max = null,
  type = null,
  formSubmitAttempted = false,
  disabled = false,
  autoComplete = null,
}) {
  const ref = useRef(null);
  const [edited, setEdited] = useState(false);
  const [showValidationMsg, setShowValidationMsg] = useState(false);
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
  const dispalyValidationMessage = showValidationMsg || formSubmitAttempted;
  return (
    <section className={classes.field}>
      <label className={disabled ? classes.disabled : ""} htmlFor={id}>
        {displayName}
      </label>
      <input
        ref={ref}
        disabled={disabled}
        id={id}
        type={type}
        required
        autoComplete={autoComplete}
        value={value}
        min={min}
        max={max}
        minLength={minLength}
        maxLength={maxLength}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {dispalyValidationMessage && (
        <span className={classes.error}>{validationMsg}</span>
      )}
    </section>
  );
}

InputField.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  displayName: PropTypes.string,
  id: PropTypes.string,
  validationMsg: PropTypes.string,
  autoComplete: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  formSubmitAttempted: PropTypes.bool,
};

export default InputField;
