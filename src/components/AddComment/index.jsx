import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import classes from "./style.module.css";
import Spinner from "../Spinner";
import { useParams } from "react-router-dom";
import ErrorModal from "../ErrorModal";

const postComment = async (postId, comment, auth) => {
  const url = import.meta.env.VITE_API_URL + "/posts/" + postId + "/comments";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: JSON.stringify({ content: comment }),
    mode: "cors",
  });
  return res;
};

function AddComment({ username, onAddComment }) {
  const { postId } = useParams();
  const [comment, setComment] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const errorModalRef = useRef(null);

  useEffect(() => {
    if (!error) return;
    errorModalRef.current.showModal();
  }, [error]);

  const handleErrorModalClose = () => {
    errorModalRef.current.close();
    setError(null);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value.trimStart());
  };

  const handleAddCommentClick = async () => {
    if (comment === "") return;
    const auth = localStorage.getItem("auth");
    setIsSending(true);
    try {
      const res = await postComment(postId, comment, auth);
      if (!res.ok) {
        throw new Error(res.status + ": " + res.statusText);
      }
      const resJson = await res.json();
      const newComment = {
        id: resJson.id,
        content: comment,
        user: username,
        updatedAt: resJson.createdAt,
      };
      onAddComment(newComment);
    } catch (err) {
      console.error(err);
      setError("Failed to add comment!");
    } finally {
      setComment("");
      setIsSending(false);
    }
  };

  const textareaId = "add-comment-textarea";
  const buttonIsDisabled = comment === "" || isSending;

  return (
    <article className={classes["add-comment"]}>
      <section className={classes.field}>
        <label htmlFor={textareaId}>Add a comment</label>
        <textarea
          id={textareaId}
          onChange={handleCommentChange}
          value={comment}
          disabled={isSending}
          className={classes["comment-textarea"]}
          cols="75"
          rows="5"
          placeholder="Your thoughts..."
          maxLength="500"
        ></textarea>
      </section>
      <button
        disabled={buttonIsDisabled}
        type="button"
        onClick={handleAddCommentClick}
        className={classes[isSending ? "add-button-spinning" : "add-button"]}
      >
        {isSending ? <Spinner /> : "Add Comment"}
      </button>
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

AddComment.propTypes = {
  username: PropTypes.string,
  onAddComment: PropTypes.func,
};

export default AddComment;
