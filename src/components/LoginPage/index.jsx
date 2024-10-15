import PropTypes from "prop-types";
import classes from "./style.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UsernameField({ value, onChange }) {
  return (
    <section className={classes.field}>
      <label htmlFor="username">Username</label>
      <input
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
};

function PasswordField({ value, onChange }) {
  return (
    <section className={classes.field}>
      <label htmlFor="password">Password</label>
      <input
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
};

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    }
  };
  return (
    <main className={classes.main}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <UsernameField value={username} onChange={handleUsernameChange} />
        <PasswordField value={password} onChange={handlePasswordChange} />
        <button className={classes.login}>Login</button>
      </form>
    </main>
  );
}

export default LoginPage;
