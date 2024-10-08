import PropTypes from "prop-types";
import classes from "./style.module.css";

function Post({ post }) {
  return (
    <section className={classes.post}>
      <header>
        <h1 className={classes.title}>{post.title}</h1>
        <span className={classes["author-detail"]}>
          by <span className={classes.author}>{post.author}</span>
        </span>
      </header>
      <p className={classes.body}>{post.body}</p>
    </section>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
