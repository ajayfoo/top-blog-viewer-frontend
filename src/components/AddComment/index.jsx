import PropTypes from "prop-types";
import { useState } from "react";
import classes from "./style.module.css";
import { useLocalStorage } from "../../hooks";

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

function AddComment({ postId, onAddComment }) {
  const [comment, setComment] = useState("");
  const username = useLocalStorage("username");
  const [isDisabled, setIsDisabled] = useState(false);
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const handleAddCommentClick = async () => {
    if (comment === "") return;
    const auth = localStorage.getItem("auth");
    setIsDisabled(true);
    try {
      const res = await postComment(postId, comment, auth);
      const resJson = await res.json();
      const newComment = {
        id: resJson.id,
        content: comment,
        user: username,
        createdAt: resJson.createdAt,
      };
      onAddComment(newComment);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDisabled(false);
      setComment("");
    }
  };
  const textareaId = "add-comment-textarea";
  return (
    <article className={classes["add-comment"]}>
      <section className={classes.field}>
        <label htmlFor={textareaId}>{username}</label>
        <textarea
          id={textareaId}
          onChange={handleCommentChange}
          value={comment}
          disabled={isDisabled}
          className={classes["comment-textarea"]}
          cols="75"
          rows="5"
          placeholder="Your thoughts..."
          maxLength="500"
        ></textarea>
      </section>
      <button
        disabled={isDisabled}
        type="button"
        onClick={handleAddCommentClick}
        className={classes["add-button"]}
      >
        Add Comment
      </button>
    </article>
  );
}

AddComment.propTypes = {
  postId: PropTypes.number,
  onAddComment: PropTypes.func,
};

export default AddComment;
