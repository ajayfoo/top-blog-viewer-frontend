import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const useFetchData = (url) => {
  const [array, setArray] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    const fetchAndSetPosts = async () => {
      try {
        const res = await fetch(url, {
          signal: controller.signal,
          mode: "cors",
        });
        const arr = await res.json();
        setArray(arr);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error(err);
      }
    };
    fetchAndSetPosts();
    return () => {
      controller.abort();
    };
  }, [url]);
  return array;
};
useFetchData.propTypes = {
  url: PropTypes.string,
};

const usePostsMap = () => {
  const posts = useFetchData(import.meta.env.VITE_API_URL + "/posts");
  if (!posts) {
    return null;
  }
  const postsMap = new Map();
  posts.forEach((p) => {
    postsMap.set(p.id, p);
  });
  return postsMap;
};

const useComments = (postId) => {
  const comments = useFetchData(
    import.meta.env.VITE_API_URL + "/posts/" + postId + "/comments"
  );
  return comments;
};
useComments.propTypes = {
  postId: PropTypes.number,
};

export { usePostsMap, useComments };
