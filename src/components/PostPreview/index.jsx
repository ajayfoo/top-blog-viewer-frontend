import PropTypes from "prop-types";

function PostPreview({ post }) {
  return post.title;
}

PostPreview.propTypes = {
  post: PropTypes.object,
};

export default PostPreview;
