import PostPreview from "../PostPreview";
import { useOutletContext } from "react-router-dom";

function HomePage() {
  const { postsMap } = useOutletContext();
  if (postsMap) {
    const postPreviews = [];
    for (const post of postsMap.values()) {
      postPreviews.push(<PostPreview key={post.id} post={post} />);
    }
    return postPreviews;
  }
  return null;
}

export default HomePage;
