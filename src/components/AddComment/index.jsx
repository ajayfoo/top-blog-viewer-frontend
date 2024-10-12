import PropTypes from "prop-types";
import { useState } from "react";
import classes from "./style.module.css";
import { useLocalStorage } from "../../hooks";
import Spinner from "../Spinner";
import { useParams } from "react-router-dom";

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

function AddComment({ onAddComment }) {
  const { postId } = useParams();
  const [comment, setComment] = useState("");
  const username = useLocalStorage("username");
  const [isSending, setIsSending] = useState(false);
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const handleAddCommentClick = async () => {
    if (comment === "") return;
    const auth = localStorage.getItem("auth");
    setIsSending(true);
    try {
      const res = await postComment(postId, comment, auth);
      if (!res.ok) {
        console.error("Something went wrong");
        return;
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
        <label htmlFor={textareaId}>{username}</label>
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
    </article>
  );
}

AddComment.propTypes = {
  onAddComment: PropTypes.func,
};

export default AddComment;
