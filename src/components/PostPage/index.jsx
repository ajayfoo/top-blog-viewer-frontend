import PropTypes from "prop-types";
import Post from "../Post";
import classes from "./style.module.css";
import { useOutletContext, useParams } from "react-router-dom";
import CommentsSection from "../CommentsSection";
import { usePageTitle } from "../../hooks";

function PostPage() {
  const { postsMap } = useOutletContext();
  const { postId } = useParams();
  const post = postsMap.get(parseInt(postId));
  usePageTitle(post.title);
  return (
    <main className={classes["post-page"]}>
      <Post />
      <CommentsSection />
    </main>
  );
}

PostPage.propTypes = {
  post: PropTypes.object,
};

export default PostPage;
