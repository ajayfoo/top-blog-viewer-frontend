import PostPreview from "../PostPreview";
import { useOutletContext } from "react-router-dom";
import classes from "./style.module.css";

function HomePage() {
  const { postsMap } = useOutletContext();
  const postPreviews = [];
  for (const post of postsMap.values()) {
    postPreviews.push(<PostPreview key={post.id} post={post} />);
  }
  return <main className={classes["home-page"]}>{postPreviews}</main>;
}

export default HomePage;
