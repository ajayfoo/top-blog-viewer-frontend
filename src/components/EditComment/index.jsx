import PropTypes from "prop-types";
import { useState } from "react";
import classes from "./style.module.css";
import { useLocalStorage } from "../../hooks";
import Spinner from "../Spinner";
import { useParams } from "react-router-dom";

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
  const username = useLocalStorage("username");
  const [isSending, setIsSending] = useState(false);
  const handleCommentChange = (e) => {
    setContent(e.target.value);
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
        console.error("Something went wrong");
        return;
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
    } finally {
      setIsSending(false);
    }
  };
  const textareaId = "edit-comment-" + initialComment.id + "-textarea";
  const buttonIsDisabled = content === "" || isSending;
  return (
    <article className={classes["add-comment"]}>
      <section className={classes.field}>
        <label htmlFor={textareaId}>{username}</label>
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
      <div className="action-buttons">
        {onCancel && (
          <button type="button" onClick={onCancel}>
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
    </article>
  );
}

EditComment.propTypes = {
  onUpdateComment: PropTypes.func,
  initialComment: PropTypes.object,
  onCancel: PropTypes.func,
};

export default EditComment;
