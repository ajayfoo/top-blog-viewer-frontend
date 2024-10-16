import classes from "./style.module.css";
import Spinner from "../Spinner";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorModal from "../ErrorModal";

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isInvalidCred, setIsInvalidCred] = useState(false);
  const errorModalRef = useRef(null);

  useEffect(() => {
    if (!error) return;
    errorModalRef.current.showModal();
  }, [error]);

  const handleErrorModalClose = () => {
    errorModalRef.current.close();
    setError(null);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = import.meta.env.VITE_API_URL + "/auth/sign-up";
      setIsSending(true);
      setIsInvalidCred(false);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, confirmPassword }),
        mode: "cors",
      });
      if (res.status === 401) {
        setIsInvalidCred(true);
        return;
      }
      if (!res.ok) {
        throw new Error(res.status + ": " + res.statusText);
      }
      setIsInvalidCred(false);
      const jwt = await res.text();
      const auth = "Bearer " + jwt;
      navigate("/");
      localStorage.setItem("auth", auth);
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setIsSending(false);
    }
  };
  return (
    <main className={classes.main}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <section className={classes.field}>
          <label
            className={isSending ? classes.disabled : ""}
            htmlFor="username"
          >
            Username
          </label>
          <input
            disabled={isSending}
            id="username"
            required
            autoComplete="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </section>
        <section className={classes.field}>
          <label
            className={isSending ? classes.disabled : ""}
            htmlFor="password"
          >
            Password
          </label>
          <input
            disabled={isSending}
            autoComplete="new-password"
            required
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </section>
        <section className={classes.field}>
          <label
            className={isSending ? classes.disabled : ""}
            htmlFor="confirm-new-password"
          >
            Confirm Password
          </label>
          <input
            autoComplete="new-password"
            disabled={isSending}
            required
            id="confirm-new-password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </section>
        {isInvalidCred && (
          <span className={classes["invalid-cred-msg"]}>
            Invalid username or password
          </span>
        )}
        <div className={classes["action-buttons"]}>
          <button disabled={isSending} className={classes.login}>
            {isSending ? <Spinner className={classes["spinner"]} /> : "Sign Up"}
          </button>
          {isSending ? (
            <span className={classes["disabled-sign-up"]}>Login</span>
          ) : (
            <Link className={classes["sign-up"]} to="/auth/login">
              Login
            </Link>
          )}
        </div>
      </form>
      {error && (
        <ErrorModal
          message={error}
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
