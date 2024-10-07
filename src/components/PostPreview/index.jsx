import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function PostPreview({ post }) {
  return <Link to={"/" + post.id}>{post.title}</Link>;
}

PostPreview.propTypes = {
  post: PropTypes.object,
};

export default PostPreview;
