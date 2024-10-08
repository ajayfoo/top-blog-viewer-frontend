import PropTypes from "prop-types";
function Comment({ comment }) {
  return (
    <article>
      <p>{comment.user.username}</p>
      <p>{comment.content}</p>
    </article>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
};

export default Comment;
