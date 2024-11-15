import { useState, useRef } from "react";
import ErrorModal from "../ErrorModal";
import classes from './style.module.css'

const becomeAuthor = (passcode) => {
  const url = import.meta.env.VITE_API_URL + "/authors";
  const auth = localStorage.getItem('auth')
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: JSON.stringify({ passcode }),
    mode: "cors",
  })
}

function BecomeAuthorForm() {
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState(null);
  const errorModalRef = useRef(null);

  const handlePasscodeChange = (e) => {
    setPasscode(e.target.value);
  }

  const handleErrorModalClose = () => {
    errorModalRef.current.close();
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await becomeAuthor(passcode);
      if (res.status === 401) {
        const msg = await res.text();
        console.log(msg);
        return;
      }
      if (!res.ok) {
        throw new Error(res.status + ": " + res.statusText);
      }
      console.log("successfully became author")
    } catch (err) {
      console.error(err)
      setError("Failed to add comment!");
    }
  }

  const passcodeFieldId = 'become-author-form-passcode';
  return <form onSubmit={handleSubmit} className={classes.form}>
    <section className={classes.field}>
      <label htmlFor={passcodeFieldId}>Passcode</label>
      <input required type="text" id={passcodeFieldId} value={passcode} onChange={handlePasscodeChange} />
    </section>
    <button className={classes['become-admin']}>Become Author</button>
    {error && (
      <ErrorModal
        message={error}
        onClose={handleErrorModalClose}
        ref={errorModalRef}
      />
    )}
  </form>
}

export default BecomeAuthorForm
