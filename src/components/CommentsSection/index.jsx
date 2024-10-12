import { useComments } from "../../hooks";
import Comment from "../Comment";
import classes from "./style.module.css";
import AddComment from "../AddComment";
import { useParams } from "react-router-dom";

function CommentsSection() {
  const { postId } = useParams();
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
          <AddComment onAddComment={handleAddComment} />
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
