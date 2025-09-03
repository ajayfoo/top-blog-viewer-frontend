import PropTypes from "prop-types";
import classes from "./style.module.css";
import "./style.css";
import { format } from "date-fns";
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import Quill from "quill/core";
import "./Blots";

function Post() {
  const quillRef = useRef(null);
  const bodyContainerRef = useRef(null);
  const { postsMap } = useOutletContext();
  const { postId } = useParams();
  const post = postsMap.get(parseInt(postId));
  const updatedAt = format(post.updatedAt, "d MMM yyyy");

  useEffect(() => {
    const container = bodyContainerRef.current;
    quillRef.current = new Quill(container);
    quillRef.current.setContents(JSON.parse(post.body));
    quillRef.current.disable();
    return () => {
      quillRef.current = null;
      container.textContent = "";
    };
  }, [post.body]);

  return (
    <section className={classes.post}>
      <header className={classes.header}>
        <h1 className={classes.title}>{post.title}</h1>
        <p className={classes["updated-at"]}>
          Last updated on <time dateTime={post.updatedAt}>{updatedAt}</time>
        </p>
      </header>
      <div className={classes.body} ref={bodyContainerRef}></div>
    </section>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
