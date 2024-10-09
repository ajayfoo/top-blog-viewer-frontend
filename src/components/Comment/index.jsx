import PropTypes from "prop-types";
import { getElapsedTime } from "../../utils";
import classes from "./style.module.css";
function Comment({ comment }) {
  const timeElapsed = getElapsedTime(comment.createdAt);
  return (
    <article className={classes.comment}>
      <header>
        <p className={classes.username}>{comment.user}</p>
        <p className={classes["time-elapsed"]}>{timeElapsed}</p>
      </header>
      <p className={classes.content}>{comment.content}</p>
    </article>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
};

export default Comment;
