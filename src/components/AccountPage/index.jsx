import { useRef } from "react";
import classes from "./style.module.css";
import ConfirmModal from "../ConfirmModal";
import { useUsername } from "../../hooks.jsx";

function AccountPage() {
  const username = useUsername();
  const confirmModalRef = useRef(null);
  const handleConfirmModalCancel = () => {
    confirmModalRef.current.close();
  };
  const handleConfirmModalConfirm = () => {};
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
