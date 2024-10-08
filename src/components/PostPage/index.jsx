import PropTypes from "prop-types";
import { useOutletContext, useParams } from "react-router-dom";
import Post from "../Post";
import Comments from "../Comments";
import classes from "./style.module.css";

function PostPage() {
  const { postsMap } = useOutletContext();
  const { postId } = useParams();
  const postIdInt = parseInt(postId);
  return (
    postsMap && (
      <main className={classes["post-page"]}>
        <Post post={postsMap.get(postIdInt)} />
        <Comments postId={postIdInt} />
      </main>
    )
  );
}

PostPage.propTypes = {
  post: PropTypes.object,
};

export default PostPage;
