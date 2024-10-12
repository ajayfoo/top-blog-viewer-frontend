import PropTypes from "prop-types";
import { useState } from "react";
import ViewComment from "../ViewComment";
import EditComment from "../EditComment";

function Comment({ comment, onUpdateComment }) {
  const [isEditing, setIsEditing] = useState(false);
  const enableEditing = () => setIsEditing(true);
  const cancelEditing = () => setIsEditing(false);
  return isEditing ? (
    <EditComment
      initialComment={comment}
      onCancel={cancelEditing}
      onUpdateComment={onUpdateComment}
    />
  ) : (
    <ViewComment comment={comment} onClickEdit={enableEditing} />
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
  postId: PropTypes.number,
  onUpdateComment: PropTypes.func,
};

export default Comment;
