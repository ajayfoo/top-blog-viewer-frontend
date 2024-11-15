import { useComments, useUser } from "../../hooks";
import Comment from "../Comment";
import classes from "./style.module.css";
import AddComment from "../AddComment";
import DummyAddComment from "../DummyAddComment";
import { Link, useParams } from "react-router-dom";
import { UserStatus } from "../../utils";

function CommentsSection() {
  const { postId } = useParams();
  const { user } = useUser();
  const [comments, setComments] = useComments(postId);
  const handleAddComment = (newComment) => {
    setComments([newComment, ...comments]);
  };
  const handleUpdateComment = (updatedComment) => {
    let targetIndex = -1;
    const targetComment = comments.find((c, i) => {
      targetIndex = i;
      return c.id === updatedComment.id;
    });
    setComments([
      {
        ...targetComment,
        ...updatedComment,
      },
      ...comments.slice(0, targetIndex),
      ...comments.slice(targetIndex + 1),
    ]);
  };
  const handleDeleteComment = (id) => {
    setComments(comments.filter((c) => c.id !== id));
  };
  return (
    <div className={classes.comments}>
      <h2 className={classes.heading}>Comments</h2>
      {comments && (
        <div className={classes["comment-items"]}>
          {user.status === UserStatus.AUTHORIZED ? (
            <AddComment
              username={user.username}
              onAddComment={handleAddComment}
            />
          ) : (
            <Link
              to="/auth/login"
              className={classes["dummy-add-comment-wrapper"]}
            >
              <DummyAddComment />
            </Link>
          )}
          {comments.map((c) => (
            <Comment
              key={c.id}
              comment={c}
              onUpdateComment={handleUpdateComment}
              onDeleteComment={handleDeleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentsSection;
