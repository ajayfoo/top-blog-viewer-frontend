import PropTypes from "prop-types";
import { getElapsedTime } from "../../utils";
import classes from "./style.module.css";
import PencilIconSrc from "/pencil.svg";
import { useLocalStorage } from "../../hooks";
function ViewComment({ comment, onClickEdit }) {
  const timeElapsed = getElapsedTime(comment.updatedAt);
  const username = useLocalStorage("username");
  return (
    <article className={classes.comment}>
      <header>
        <p className={classes.username}>{comment.user}</p>
        <p className={classes["time-elapsed"]}>{timeElapsed}</p>
        {username === comment.user && (
          <button
            type="button"
            onClick={onClickEdit}
            className={classes["edit-button"]}
          >
            <img
              className={classes["edit-icon"]}
              src={PencilIconSrc}
              alt="edit comment"
            />
          </button>
        )}
      </header>
      <p className={classes.content}>{comment.content}</p>
    </article>
  );
}

ViewComment.propTypes = {
  comment: PropTypes.object,
  onClickEdit: PropTypes.func,
};

export default ViewComment;
