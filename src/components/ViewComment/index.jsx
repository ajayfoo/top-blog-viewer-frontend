import PropTypes from "prop-types";
import { getElapsedTime } from "../../utils";
import classes from "./style.module.css";
import PencilIconSrc from "/pencil.svg";
import DustbinIconSrc from "/dustbin.svg";
import { useLocalStorage } from "../../hooks";
import { useEffect, useRef, useState } from "react";
import ConfirmModal from "../ConfirmModal";
import { useParams } from "react-router-dom";
import ErrorModal from "../ErrorModal";

const deleteComment = async (postId, id) => {
  const auth = localStorage.getItem("auth");
  const url =
    import.meta.env.VITE_API_URL + "/posts/" + postId + "/comments/" + id;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: auth,
    },
    mode: "cors",
  });
  return res;
};

function ViewComment({ comment, onClickEdit, onDeleteComment }) {
  const { postId } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const confirmModalRef = useRef(null);
  const [error, setError] = useState(null);
  const errorModalRef = useRef(null);
  const timeElapsed = getElapsedTime(comment.updatedAt);
  const username = useLocalStorage("username");

  useEffect(() => {
    if (!showDeleteModal) return;
    confirmModalRef.current.showModal();
  }, [showDeleteModal]);

  useEffect(() => {
    if (!error) return;
    errorModalRef.current.showModal();
  }, [error]);

  const handleErrorModalClose = () => {
    errorModalRef.current.close();
    setError(null);
  };

  const handleCloseModal = () => {
    confirmModalRef.current.close();
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteComment(postId, comment.id);
      if (!res.ok) {
        throw new Error(res.status + ": " + res.statusText);
      }
      onDeleteComment(comment.id);
      handleCloseModal();
    } catch (err) {
      console.error(err);
      setError("Failed to delete comment!");
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  return (
    <article className={classes.comment}>
      <header>
        <p className={classes.username}>{comment.user}</p>
        <p className={classes["time-elapsed"]}>{timeElapsed}</p>
        {username === comment.user && (
          <div className={classes["action-buttons"]}>
            <button
              type="button"
              onClick={onClickEdit}
              className={classes["edit-button"]}
              title="edit comment"
              aria-label="edit comment"
            >
              <img
                className={classes["edit-icon"]}
                src={PencilIconSrc}
                alt=""
              />
            </button>
            <button
              type="button"
              onClick={handleDeleteClick}
              className={classes["edit-button"]}
              title="delete comment"
              aria-label="delete comment"
            >
              <img
                className={classes["delete-icon"]}
                src={DustbinIconSrc}
                alt=""
              />
            </button>
          </div>
        )}
      </header>
      <p className={classes.content}>{comment.content}</p>
      {showDeleteModal && (
        <ConfirmModal
          message="Are you sure you want to delete the comment?"
          onCancel={handleCloseModal}
          onConfirm={handleConfirmDelete}
          ref={confirmModalRef}
        />
      )}
      {error && (
        <ErrorModal
          message={error}
          onClose={handleErrorModalClose}
          ref={errorModalRef}
        />
      )}
    </article>
  );
}

ViewComment.propTypes = {
  comment: PropTypes.object,
  onClickEdit: PropTypes.func,
  onDeleteComment: PropTypes.func,
};

export default ViewComment;
