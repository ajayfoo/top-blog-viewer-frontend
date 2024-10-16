import PropTypes from "prop-types";
import classes from "./style.module.css";
import Spinner from "../Spinner";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UsernameField({ value, onChange, disabled }) {
  return (
    <section className={classes.field}>
      <label className={disabled ? classes.disabled : ""} htmlFor="username">
        Username
      </label>
      <input
        disabled={disabled}
        id="username"
        required
        autoComplete="username"
        type="text"
        value={value}
        onChange={onChange}
      />
    </section>
  );
}
UsernameField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

function PasswordField({ value, onChange, disabled }) {
  return (
    <section className={classes.field}>
      <label className={disabled ? classes.disabled : ""} htmlFor="password">
        Password
      </label>
      <input
        disabled={disabled}
        autoComplete="current-password"
        required
        id="password"
        type="password"
        value={value}
        onChange={onChange}
      />
    </section>
  );
}
PasswordField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = import.meta.env.VITE_API_URL + "/auth/login";
      setIsSending(true);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
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
    } finally {
      setIsSending(false);
    }
  };
  return (
    <main className={classes.main}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <UsernameField
          disabled={isSending}
          value={username}
          onChange={handleUsernameChange}
        />
        <PasswordField
          disabled={isSending}
          value={password}
          onChange={handlePasswordChange}
        />
        <div className={classes["action-buttons"]}>
          <button disabled={isSending} className={classes.login}>
            {isSending ? <Spinner className={classes["spinner"]} /> : "Login"}
          </button>
          {isSending ? (
            <span className={classes["disabled-sign-up"]}>Sign Up</span>
          ) : (
            <Link className={classes["sign-up"]} to="/auth/sign-up">
              Sign Up
            </Link>
          )}
        </div>
      </form>
    </main>
  );
}

function LoginPage() {
  return <LoginForm />;
}

export default LoginPage;
