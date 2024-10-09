import PropTypes from "prop-types";
import { useComments } from "../../hooks";
import Comment from "../Comment";
import classes from "./style.module.css";
import AddComment from "../AddComment";
function Comments({ postId }) {
  const [comments, setComments] = useComments(postId);
  const handleAddComment = (newComment) => {
    setComments([newComment, ...comments]);
  };
  return (
    <div className={classes.comments}>
      <h2 className={classes.heading}>Comments</h2>
      {comments && (
        <div className={classes["comment-items"]}>
          <AddComment onAddComment={handleAddComment} postId={postId} />
          {comments.map((c) => (
            <Comment key={c.id} comment={c} />
          ))}
        </div>
      )}
    </div>
  );
}

Comments.propTypes = {
  postId: PropTypes.number,
};

export default Comments;
