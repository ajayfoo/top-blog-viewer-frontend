import { useState, useRef, useEffect } from "react";
import ErrorModal from "../ErrorModal";
import classes from "./style.module.css";
import Spinner from "../Spinner";
import { useUser } from "../../hooks";
import SuccessModal from "../SuccessModal";
import PasswordField from "../PasswordField";

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
  const { setUserIsAuthor } = useUser();
  const [passcode, setPasscode] = useState("");
  const [success, setSuccess] = useState(null);
  const successModalRef = useRef(null);
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const errorModalRef = useRef(null);

  useEffect(() => {
    if (!error) return;
    errorModalRef.current.showModal();
  }, [error]);

  const handlePasscodeChange = (e) => {
    setPasscode(e.target.value);
  };

  const handleSuccessModalClose = () => {
    successModalRef.current.close();
    setSuccess(null);
    setUserIsAuthor(true);
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
        setError(msg);
        return;
      }
      if (!res.ok) {
        throw new Error(res.status + ": " + res.statusText);
      }
      setSuccess("Successfully became author");
    } catch (err) {
      console.error(err);
      setError("Failed to send passcode!");
    } finally {
      setIsSending(false);
    }
  };

  const passcodeFieldId = "become-author-form-passcode";
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <PasswordField
        id={passcodeFieldId}
        label="Passcode"
        value={passcode}
        onChange={handlePasscodeChange}
        disabled={isSending}
        validationMsg={null}
      />
      <button disabled={isSending} className={classes["become-admin"]}>
        {isSending ? <Spinner /> : "Become Author"}
      </button>
      {success && (
        <SuccessModal
          message={success}
          onClose={handleSuccessModalClose}
          ref={successModalRef}
        />
      )}
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
