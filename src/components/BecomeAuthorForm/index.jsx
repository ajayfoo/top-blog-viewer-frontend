import { useState, useRef } from "react";
import ErrorModal from "../ErrorModal";
import classes from "./style.module.css";
import Spinner from "../Spinner";

const becomeAuthor = (passcode) => {
  const url = import.meta.env.VITE_API_URL + "/authors";
  const auth = localStorage.getItem("auth");
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: JSON.stringify({ passcode }),
    mode: "cors",
  });
};

function BecomeAuthorForm() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const errorModalRef = useRef(null);

  const handlePasscodeChange = (e) => {
    setPasscode(e.target.value);
  };

  const handleErrorModalClose = () => {
    errorModalRef.current.close();
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSending(true);
      const res = await becomeAuthor(passcode);
      if (res.status === 401) {
        const msg = await res.text();
        console.log(msg);
        return;
      }
      if (!res.ok) {
        throw new Error(res.status + ": " + res.statusText);
      }
      console.log("successfully became author");
    } catch (err) {
      console.error(err);
      setError("Failed to add comment!");
    } finally {
      setIsSending(false);
    }
  };

  const fieldClass = `${classes.field} ${isSending ? classes.disabled : ""}`;
  const passcodeFieldId = "become-author-form-passcode";
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <section className={fieldClass}>
        <label htmlFor={passcodeFieldId}>Passcode</label>
        <input
          disabled={isSending}
          required
          type="text"
          id={passcodeFieldId}
          value={passcode}
          onChange={handlePasscodeChange}
        />
      </section>
      <button disabled={isSending} className={classes["become-admin"]}>
        {isSending ? <Spinner /> : "Become Author"}
      </button>
      {error && (
        <ErrorModal
          message={error}
          onClose={handleErrorModalClose}
          ref={errorModalRef}
        />
      )}
    </form>
  );
}

export default BecomeAuthorForm;
