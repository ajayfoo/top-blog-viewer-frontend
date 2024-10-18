import classes from "./style.module.css";
import Spinner from "../Spinner";
import { useEffect, useReducer, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorModal from "../ErrorModal";
import signUpFormReducer from "./reducer.js";

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

const handleSubmitEvent = async (e, dispatch, state, navigate) => {
  e.preventDefault();
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

const updateUsernameError = (username, set) => {
  if (username.length === 0) {
    set("Required");
  } else if (username.length < 6 || username.length > 36) {
    set("Must be 6-36 characters long");
  } else if (!isAlphaNumericOrUnderscore(username)) {
    set("Must contain only alphabets, numbers or underscore");
  } else {
    set(null);
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
  const [usernameError, setUsernameError] = useState(null);
  const [showUsernameError, setShowUsernameError] = useState(false);
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

  const handleUsernameBlur = () => {
    setShowUsernameError(true);
  };
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    dispatch({
      type: "username_edited",
      text: value,
    });
    updateUsernameError(value, setUsernameError);
  };

  const handlePasswordChange = (e) => {
    dispatch({
      type: "password_edited",
      text: e.target.value,
    });
  };

  const handleConfirmPasswordChange = (e) => {
    dispatch({
      type: "confirm_password_edited",
      text: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    await handleSubmitEvent(e, dispatch, state, navigate);
  };

  const disableAllFields = state.isSending;
  return (
    <main className={classes.main}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <section className={classes.field}>
          <label
            className={disableAllFields ? classes.disabled : ""}
            htmlFor="username"
          >
            Username
          </label>
          <input
            disabled={disableAllFields}
            id="username"
            required
            autoComplete="username"
            type="text"
            value={state.username}
            minLength={6}
            maxLength={36}
            onChange={handleUsernameChange}
            onBlur={handleUsernameBlur}
          />
          {showUsernameError && (
            <span className={classes.error}>{usernameError}</span>
          )}
        </section>
        <section className={classes.field}>
          <label
            className={disableAllFields ? classes.disabled : ""}
            htmlFor="password"
          >
            Password
          </label>
          <input
            disabled={disableAllFields}
            autoComplete="new-password"
            required
            id="password"
            type="password"
            value={state.password}
            onChange={handlePasswordChange}
          />
        </section>
        <section className={classes.field}>
          <label
            className={disableAllFields ? classes.disabled : ""}
            htmlFor="confirm-new-password"
          >
            Confirm Password
          </label>
          <input
            autoComplete="new-password"
            disabled={disableAllFields}
            required
            id="confirm-new-password"
            type="password"
            value={state.confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </section>
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
      </form>
      {state.error && (
        <ErrorModal
          message={state.error}
          onClose={handleErrorModalClose}
          ref={errorModalRef}
        />
      )}
    </main>
  );
}

function SignUpPage() {
  return <SignUpForm />;
}

export default SignUpPage;
