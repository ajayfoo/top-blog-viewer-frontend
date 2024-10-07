import PropTypes from "prop-types";
import { useOutletContext, useParams } from "react-router-dom";
import Post from "../Post";

function PostPage() {
  const { postsMap } = useOutletContext();
  const { postId } = useParams();
  const postIdInt = parseInt(postId);
  return postsMap && <Post post={postsMap.get(postIdInt)} />;
}

PostPage.propTypes = {
  post: PropTypes.object,
};

export default PostPage;
