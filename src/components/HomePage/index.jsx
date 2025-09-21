import PostPreview from "../PostPreview";
import { useOutletContext } from "react-router-dom";
import classes from "./style.module.css";
import { usePageTitle } from "../../hooks";

function HomePage() {
  usePageTitle("Posts");
  const { postsMap } = useOutletContext();
  const postPreviews = [];
  for (const post of postsMap.values()) {
    postPreviews.push(<PostPreview key={post.id} post={post} />);
  }
  return (
    <main className={classes["home-page"]}>
      <div className={classes["posts"]}>{postPreviews}</div>
    </main>
  );
}

export default HomePage;
