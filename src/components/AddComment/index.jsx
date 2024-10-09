import PropTypes from "prop-types";
import { useState } from "react";

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
  const [isDisabled, setIsDisabled] = useState(false);
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const handleAddCommentClick = async () => {
    const auth = localStorage.getItem("auth");
    setIsDisabled(true);
    try {
      const res = await postComment(postId, comment, auth);
      const resJson = await res.json();
      const newComment = {
        id: resJson.id,
        content: comment,
        user: "",
        createdAt: resJson.createdAt,
      };
      onAddComment(newComment);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDisabled(false);
    }
  };
  return (
    <article>
      <textarea
        id="add-comment-textarea"
        onChange={handleCommentChange}
        value={comment}
        disabled={isDisabled}
      ></textarea>
      <button
        disabled={isDisabled}
        type="button"
        onClick={handleAddCommentClick}
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
