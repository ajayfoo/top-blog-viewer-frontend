import PropTypes from "prop-types";

function Post({ post }) {
  return post.title + " " + post.body;
}

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
