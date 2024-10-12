import PropTypes from "prop-types";
import { getElapsedTime } from "../../utils";
import classes from "./style.module.css";
import PencilIconSrc from "/pencil.svg";
import DustbinIconSrc from "/dustbin.svg";
import { useLocalStorage } from "../../hooks";
import { useEffect, useRef, useState } from "react";
import ConfirmModal from "../ConfirmModal";
import { useParams } from "react-router-dom";

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
  const modalRef = useRef(null);
  useEffect(() => {
    if (!showDeleteModal) return;
    modalRef.current.showModal();
  }, [showDeleteModal]);
  const timeElapsed = getElapsedTime(comment.updatedAt);
  const username = useLocalStorage("username");
  const handleCloseModal = () => {
    modalRef.current.close();
    setShowDeleteModal(false);
  };
  const handleConfirmDelete = async () => {
    try {
      const res = await deleteComment(postId, comment.id);
      if (!res.ok) {
        console.error("Something went wrong");
        return;
      }
      onDeleteComment(comment.id);
      handleCloseModal();
    } catch (err) {
      console.error(err);
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
          ref={modalRef}
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
