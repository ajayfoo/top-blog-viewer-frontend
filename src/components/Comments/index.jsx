import PropTypes from "prop-types";
import { useComments } from "../../hooks";
import Comment from "../Comment";
function Comments({ postId }) {
  const comments = useComments(postId);
  return comments && comments.map((c) => <Comment key={c.id} comment={c} />);
}

Comments.propTypes = {
  postId: PropTypes.number,
};

export default Comments;
