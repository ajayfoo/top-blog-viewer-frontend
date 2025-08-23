import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import classes from "./style.module.css";
import Spinner from "../../Spinner";
import TickIcon from "../../Icons/TickIcon";
import CloseIcon from "../../Icons/CloseIcon";

const getUsernameValidationMsg = (change, minLength, maxLength) => {
  const value = change.value;
  if (value.length === 0) {
    return UsernameValidationMessages.EMTPY;
  } else if (value.length < minLength || value.length > maxLength) {
    return UsernameValidationMessages.OUTSIDE_RANGE;
  } else if (!isAlphaNumericOrUnderscore(value)) {
    return UsernameValidationMessages.INVALID_CHARACTERS;
  } else if (change.availability === UsernameAvailability.UNAVAILABLE) {
    return UsernameValidationMessages.UNAVAILABLE;
  } else {
    return UsernameValidationMessages.VALID;
  }
};

const isAlphaNumericOrUnderscore = (str) => {
  let code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (
      !(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123) && // lower alpha (a-z)
      !(code === 95)
    ) {
      return false;
    }
  }
  return true;
};

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

const getAvailabilityIconFor = (availability) => {
  const { CHECKING, AVAILABLE, UNAVAILABLE } = UsernameAvailability;
  switch (availability) {
    case AVAILABLE:
      return <TickIcon className={classes.available} />;
    case UNAVAILABLE:
      return <CloseIcon className={classes.unavailable} />;
    case CHECKING:
      return <Spinner className={classes.spinner} />;
    default:
      return null;
  }
};

const UsernameAvailability = {
  UNDETERMINED: "undetermined",
  CHECKING: "checking",
  AVAILABLE: "available",
  UNAVAILABLE: "unavailable",
};

const UsernameValidationMessages = {
  VALID: null,
  UNAVAILABLE: "Username is unavailable",
  EMTPY: "Required",
  OUTSIDE_RANGE: "Must be 6-36 characters long",
  INVALID_CHARACTERS: "Must contain only alphabets, numbers or underscore",
};

function UsernameField({
  value,
  onChange,
  id,
  minLength,
  maxLength,
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

  const validationMsg = getUsernameValidationMsg(
    { value, availability },
    minLength,
    maxLength
  );
  const canCheckForAvailability =
    validationMsg === UsernameValidationMessages.UNAVAILABLE ||
    validationMsg === UsernameValidationMessages.VALID;

  useEffect(() => {
    if (!canCheckForAvailability) {
      return;
    }
    const controller = new AbortController();
    const checkForAvailability = async () => {
      try {
        setAvailability(UsernameAvailability.CHECKING);
        const isAvailable = await usernameIsAvailable(value, controller.signal);
        const newAvailability = isAvailable
          ? UsernameAvailability.AVAILABLE
          : UsernameAvailability.UNAVAILABLE;
        setAvailability(newAvailability);
      } catch {
        setAvailability(UsernameAvailability.UNDETERMINED);
      }
    };
    checkForAvailability();
    return () => {
      controller.abort();
      setAvailability(UsernameAvailability.UNDETERMINED);
    };
  }, [canCheckForAvailability, value]);

  useEffect(() => {
    const validationMessageExists = !!validationMsg;
    if (validationMessageExists) {
      ref.current.setCustomValidity(validationMsg);
    } else {
      ref.current.setCustomValidity("");
    }
  }, [validationMsg, edited]);

  const handleBlur = () => {
    if (!edited) return;
    setShowValidationMsg(validationMsg ? true : false);
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    onChange(value);
    setEdited(true);
  };

  const fieldClass = `${classes.field} ${disabled ? classes.disabled : ""}`;
  const dispalyValidationMessage =
    showValidationMsg || (formSubmitAttempted && validationMsg);
  const availabilityIcon = getAvailabilityIconFor(
    canCheckForAvailability ? availability : null
  );
  return (
    <section className={fieldClass}>
      <label htmlFor={id}>Username</label>
      <div
        className={`${classes["input-wrapper"]} ${dispalyValidationMessage ? classes["error-border-color"] : ""}`}
      >
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
        {availabilityIcon}
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
  autoComplete: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  formSubmitAttempted: PropTypes.bool,
};

export { UsernameField, UsernameAvailability };
