import PropTypes from "prop-types";
import classes from "./style.module.css";
import { useState } from "react";

function UsernameField({ initialValue = "" }) {
  const [text, setText] = useState(initialValue);
  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <section className={classes.field}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        autoComplete="username"
        type="text"
        value={text}
        onChange={handleChange}
      />
    </section>
  );
}
UsernameField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  initialValue: PropTypes.string,
};

function PasswordField({ initialValue = "" }) {
  const [text, setText] = useState(initialValue);
  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <section className={classes.field}>
      <label htmlFor="password">Password</label>
      <input
        autoComplete="current-password"
        id="password"
        type="password"
        value={text}
        onChange={handleChange}
      />
    </section>
  );
}
PasswordField.propTypes = {
  name: PropTypes.string,
  initialValue: PropTypes.string,
};

function LoginPage() {
  return (
    <main className={classes.main}>
      <form className={classes.form}>
        <UsernameField />
        <PasswordField />
        <button className={classes.login} type="button">
          Login
        </button>
      </form>
    </main>
  );
}

export default LoginPage;
