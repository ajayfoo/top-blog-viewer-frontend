import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import classes from "./style.module.css";
import { useUser } from "../../hooks";
import Spinner from "../Spinner";
import { useParams } from "react-router-dom";
import ErrorModal from "../ErrorModal";

const sendPatchCommentRequest = async (postId, id, content) => {
  const auth = localStorage.getItem("auth");
  const url =
    import.meta.env.VITE_API_URL + "/posts/" + postId + "/comments/" + id;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: JSON.stringify({ content }),
    mode: "cors",
  });
  return res;
};

function EditComment({ onUpdateComment, initialComment, onCancel }) {
  const { postId } = useParams();
  const [content, setContent] = useState(initialComment.content);
  const { user } = useUser();
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const errorModalRef = useRef(null);

  useEffect(() => {
    if (!error) return;
    errorModalRef.current.showModal();
  }, [error]);

  const handleCommentChange = (e) => {
    setContent(e.target.value.trimStart());
  };

  const handleErrorModalClose = () => {
    errorModalRef.current.close();
    setError(null);
  };

  const handleUpdateClick = async () => {
    if (content === "") return;
    setIsSending(true);
    try {
      const res = await sendPatchCommentRequest(
        postId,
        initialComment.id,
        content
      );
      if (!res.ok) {
        throw new Error(res.status + ": " + res.statusText);
      }
      const resJson = await res.json();
      const updatedComment = {
        ...initialComment,
        content,
        ...resJson,
      };
      onUpdateComment(updatedComment);
      onCancel();
    } catch (err) {
      console.error(err);
      setError("Failed to update comment!");
    } finally {
      setIsSending(false);
    }
  };
  const textareaId = "edit-comment-" + initialComment.id + "-textarea";
  const buttonIsDisabled =
    content === "" || isSending || content === initialComment.content;
  return (
    <article className={classes["add-comment"]}>
      <section className={classes.field}>
        <label htmlFor={textareaId}>{user.username}</label>
        <textarea
          id={textareaId}
          onChange={handleCommentChange}
          value={content}
          disabled={isSending}
          className={classes["comment-textarea"]}
          cols="75"
          rows="5"
          placeholder="Your thoughts..."
          maxLength="500"
        ></textarea>
      </section>
      <div className={classes["action-buttons"]}>
        {onCancel && (
          <button
            className={classes["cancel-button"]}
            type="button"
            onClick={onCancel}
            disabled={isSending}
          >
            Cancel
          </button>
        )}
        <button
          disabled={buttonIsDisabled}
          type="button"
          onClick={handleUpdateClick}
          className={classes[isSending ? "add-button-spinning" : "add-button"]}
        >
          {isSending ? <Spinner /> : "Update"}
        </button>
      </div>
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

EditComment.propTypes = {
  onUpdateComment: PropTypes.func,
  initialComment: PropTypes.object,
  onCancel: PropTypes.func,
};

export default EditComment;
