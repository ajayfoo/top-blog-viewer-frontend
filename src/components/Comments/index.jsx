import PropTypes from "prop-types";
import { useComments } from "../../hooks";
import Comment from "../Comment";
import classes from "./style.module.css";
function Comments({ postId }) {
  const comments = useComments(postId);
  return (
    <div className={classes.comments}>
      <h2 className={classes.heading}>Comments</h2>
      {comments && (
        <div className={classes["comment-items"]}>
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
