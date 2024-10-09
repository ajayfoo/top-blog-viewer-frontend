import PropTypes from "prop-types";
import classes from "./style.module.css";
import { format } from "date-fns";

function Post({ post }) {
  const updatedAt = format(post.updatedAt, "d MMM yyyy");
  return (
    <section className={classes.post}>
      <header>
        <span className={classes.author}>{post.author}</span>
        <h1 className={classes.title}>{post.title}</h1>
        <p className={classes["updated-at"]}>
          Last updated on <time dateTime={post.updatedAt}>{updatedAt}</time>
        </p>
      </header>
      <p className={classes.body}>{post.body}</p>
    </section>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
