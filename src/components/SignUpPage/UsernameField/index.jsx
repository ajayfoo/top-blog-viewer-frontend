import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import classes from "./style.module.css";
import Spinner from "../../Spinner";

const usernameIsAvailable = async (username, signal) => {
  try {
    const res = await fetch(
      import.meta.env.VITE_API_URL + "/auth/available-usernames/" + username,
      {
        method: "HEAD",
        mode: "cors",
        signal,
      }
    );
    return res.ok;
  } catch {
    return false;
  }
};

const UsernameAvailability = {
  UNDETERMINED: "undetermined",
  CHECKING: "checking",
  AVAILABLE: "available",
  UNAVAILABLE: "unavailable",
};

function UsernameField({
  value,
  validationMsg,
  onChange,
  id,
  minLength = null,
  maxLength = null,
  formSubmitAttempted = false,
  disabled = false,
  autoComplete = null,
}) {
  const ref = useRef(null);
  const [edited, setEdited] = useState(false);
  const [showValidationMsg, setShowValidationMsg] = useState(false);
  const [availability, setAvailability] = useState(
    UsernameAvailability.UNDETERMINED
  );

  useEffect(() => {
    if (!validationMsg) {
      ref.current.setCustomValidity("");
      return;
    }
    ref.current.setCustomValidity(validationMsg);
  }, [validationMsg]);

  useEffect(() => {
    const controller = new AbortController();
    const updateAvailability = async () => {
      try {
        setAvailability(UsernameAvailability.CHECKING);
        const isAvailable = await usernameIsAvailable(value, controller.signal);
        setAvailability(
          isAvailable
            ? UsernameAvailability.AVAILABLE
            : UsernameAvailability.UNAVAILABLE
        );
      } catch {
        setAvailability(UsernameAvailability.UNDETERMINED);
      }
    };
    updateAvailability();
    return () => {
      controller.abort();
    };
  }, [value]);

  const handleBlur = () => {
    if (!edited) return;
    setShowValidationMsg(validationMsg ? true : false);
  };

  const handleChange = (e) => {
    setEdited(true);
    onChange(e);
  };

  const dispalyValidationMessage =
    showValidationMsg || (formSubmitAttempted && validationMsg);
  return (
    <section className={classes.field}>
      <label className={disabled ? classes.disabled : ""} htmlFor={id}>
        Username
      </label>
      <div className={classes["input-wrapper"]}>
        <input
          ref={ref}
          disabled={disabled}
          id={id}
          required
          autoComplete={autoComplete}
          value={value}
          minLength={minLength}
          maxLength={maxLength}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {availability === UsernameAvailability.CHECKING && (
          <Spinner className={classes.spinner} />
        )}
      </div>
      {dispalyValidationMessage && (
        <span className={classes.error}>{validationMsg}</span>
      )}
    </section>
  );
}

UsernameField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  validationMsg: PropTypes.string,
  autoComplete: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  formSubmitAttempted: PropTypes.bool,
};

export default UsernameField;
