import classes from "./style.module.css";

function DummyAddComment() {
  return (
    <article className={classes["dummy-add-comment"]}>
      <section className={classes.field}>
        <p>Add a comment</p>
        <textarea
          id="dummy-add-comment-textarea"
          disabled={true}
          className={classes["dummy-comment-textarea"]}
          cols="75"
          rows="5"
          placeholder="Your thoughts..."
          maxLength="500"
        ></textarea>
      </section>
      <button disabled={true} type="button" className={classes["add-button"]}>
        Add Comment
      </button>
    </article>
  );
}

export default DummyAddComment;
