import classes from "./style.module.css";
import Spinner from "../Spinner";
import { useEffect, useReducer, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorModal from "../ErrorModal";
import signUpFormReducer from "./reducer.js";
import InputField from "../InputField/index.jsx";
import validator from "validator";

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

const updateUsernameValidationMsg = (value, setMsg) => {
  if (value.length === 0) {
    setMsg("Required");
  } else if (value.length < 6 || value.length > 36) {
    setMsg("Must be 6-36 characters long");
  } else if (!isAlphaNumericOrUnderscore(value)) {
    setMsg("Must contain only alphabets, numbers or underscore");
  } else {
    setMsg(null);
  }
};

const updatePasswordValidationMsg = (value, setMsg) => {
  if (value.length === 0) {
    setMsg("Required");
  } else if (value.length < 8) {
    setMsg("Must be at least 8 characters long");
  } else if (
    !validator.isStrongPassword(value, {
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    setMsg(
      "Password must be strong and contain at least one uppercase letter, one lowercase letter, one number and one symbol from -#!$@£%^&*()_+|~=`{}[]:\";'<>?,./\\ "
    );
  } else {
    setMsg(null);
  }
};

const updateConfirmPasswordValidationMsg = (value, password, setMsg) => {
  if (value.length === 0) {
    setMsg("Required");
  } else if (value !== password) {
    setMsg("Password mismatch");
  } else {
    setMsg(null);
  }
};

const handleSubmitEvent = async (dispatch, state, navigate) => {
  const { username, password, confirmPassword } = state;
  try {
    const url = import.meta.env.VITE_API_URL + "/auth/sign-up";
    dispatch({
      type: "sending",
    });
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, confirmPassword }),
      mode: "cors",
    });
    if (!res.ok) {
      throw new Error(res.status + ": " + res.statusText);
    }
    const jwt = await res.text();
    const auth = "Bearer " + jwt;
    navigate("/");
    localStorage.setItem("auth", auth);
  } catch (err) {
    console.error(err);
    dispatch({
      type: "errored",
      text: "Something went wrong",
    });
  } finally {
    dispatch({
      type: "sent",
    });
  }
};

function SignUpForm() {
  const [state, dispatch] = useReducer(signUpFormReducer, {
    username: "",
    password: "",
    confirmPassword: "",
    isSending: false,
    error: null,
  });
  const [usernameValidationMsg, setUsernameValidationMsg] =
    useState("Required");
  const [passwordValidationMsg, setPasswordValidationMsg] =
    useState("Required");
  const [confirmPasswordValidationMsg, setConfirmPasswordValidationMsg] =
    useState("Required");
  const [formSubmitAttempted, setFormSubmitAttempted] = useState(false);
  const navigate = useNavigate();
  const errorModalRef = useRef(null);

  useEffect(() => {
    if (!state.error) return;
    errorModalRef.current.showModal();
  }, [state.error]);

  const handleErrorModalClose = () => {
    errorModalRef.current.close();
    dispatch({
      type: "error_cleared",
    });
  };

  const handleUsernameChange = (e) => {
    const newValue = e.target.value;
    updateUsernameValidationMsg(newValue, setUsernameValidationMsg);
    dispatch({
      type: "username_edited",
      text: newValue,
    });
  };

  const handlePasswordChange = (e) => {
    const newValue = e.target.value;
    dispatch({
      type: "password_edited",
      text: newValue,
    });
    updatePasswordValidationMsg(newValue, setPasswordValidationMsg);
    updateConfirmPasswordValidationMsg(
      state.confirmPassword,
      newValue,
      setConfirmPasswordValidationMsg
    );
  };

  const handleConfirmPasswordChange = (e) => {
    const newValue = e.target.value;
    dispatch({
      type: "confirm_password_edited",
      text: newValue,
    });
    updateConfirmPasswordValidationMsg(
      newValue,
      state.password,
      setConfirmPasswordValidationMsg
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitAttempted(true);
    if (!e.target.checkValidity()) return;
    await handleSubmitEvent(dispatch, state, navigate);
  };

  const disableAllFields = state.isSending;
  return (
    <form noValidate={true} onSubmit={handleSubmit} className={classes.form}>
      <InputField
        formSubmitAttempted={formSubmitAttempted}
        value={state.username}
        validationMsg={usernameValidationMsg}
        onChange={handleUsernameChange}
        disabled={disableAllFields}
        displayName="Username"
        id="sign-up-form-username"
        minLength={6}
        maxLength={36}
        autoComplete="username"
      />
      <InputField
        formSubmitAttempted={formSubmitAttempted}
        value={state.password}
        type="password"
        validationMsg={passwordValidationMsg}
        onChange={handlePasswordChange}
        disabled={disableAllFields}
        displayName="Password"
        id="sign-up-form-password"
        minLength={8}
        maxLength={120}
        autoComplete="new-password"
      />
      <InputField
        formSubmitAttempted={formSubmitAttempted}
        value={state.confirmPassword}
        type="password"
        validationMsg={confirmPasswordValidationMsg}
        onChange={handleConfirmPasswordChange}
        disabled={disableAllFields}
        displayName="Confirm Password"
        id="sign-up-form-confirm-password"
        autoComplete="new-password"
      />
      <div className={classes["action-buttons"]}>
        <button disabled={disableAllFields} className={classes.login}>
          {disableAllFields ? (
            <Spinner className={classes["spinner"]} />
          ) : (
            "Sign Up"
          )}
        </button>
        {disableAllFields ? (
          <span className={classes["disabled-sign-up"]}>Login</span>
        ) : (
          <Link className={classes["sign-up"]} to="/auth/login">
            Login
          </Link>
        )}
      </div>
      {state.error && (
        <ErrorModal
          message={state.error}
          onClose={handleErrorModalClose}
          ref={errorModalRef}
        />
      )}
    </form>
  );
}

function SignUpPage() {
  return (
    <main className={classes.main}>
      <SignUpForm />
    </main>
  );
}

export default SignUpPage;
