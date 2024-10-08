import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classes from "./style.module.css";
import { format } from "date-fns";

function PostPreview({ post }) {
  const updatedAt = format(post.updatedAt, "d MMM yyyy");
  return (
    <article className={classes["post-preview"]}>
      <p>{updatedAt}</p>
      <h2 className={classes.title}>
        <Link to={"/" + post.id}>{post.title}</Link>
      </h2>
      <p className={classes.body}>{post.body}</p>
      <p>{post.author}</p>
    </article>
  );
}

PostPreview.propTypes = {
  post: PropTypes.object,
};

export default PostPreview;
