import { useRef } from "react";
import classes from "./style.module.css";
import ConfirmModal from "../ConfirmModal";
import { useUsername } from "../../hooks.jsx";
import { Navigate, useNavigate } from "react-router-dom";

function AccountPage() {
  const username = useUsername();
  const confirmModalRef = useRef(null);
  const navigate = useNavigate();

  if (!username) {
    return <Navigate to="/auth/login" />;
  }

  const handleConfirmModalCancel = () => {
    confirmModalRef.current.close();
  };

  const handleConfirmModalConfirm = () => {
    localStorage.removeItem("auth");
    navigate("/auth/login");
  };

  const showConfirmModal = () => {
    confirmModalRef.current.showModal();
  };

  return (
    <main className={classes["account-page"]}>
      <h1 className={classes.username}>{username}</h1>
      <button
        className={classes["logout-button"]}
        type="button"
        onClick={showConfirmModal}
      >
        Logout
      </button>
      <ConfirmModal
        onCancel={handleConfirmModalCancel}
        onConfirm={handleConfirmModalConfirm}
        message="Are you sure you want to logout?"
        ref={confirmModalRef}
      />
    </main>
  );
}

export default AccountPage;
