import PropTypes from "prop-types";
import PostPreview from "../PostPreview";

function HomePage({ posts }) {
  return posts.map((p) => <PostPreview key={p.id} post={p} />);
}

HomePage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
};
export default HomePage;
