import classes from "./style.module.css";

function DummyAddComment() {
  return (
    <article className={classes["dummy-add-comment"]}>
      <div className={classes.field}>
        <p>Add a comment</p>
        <div className={classes["dummy-comment-textarea"]}>
          Your thoughts...
        </div>
      </div>
      <span className={classes["add-button"]}>Add Comment</span>
    </article>
  );
}

export default DummyAddComment;
