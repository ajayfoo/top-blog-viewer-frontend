import PropTypes from "prop-types";
import { useContext, useEffect, useState, useSyncExternalStore } from "react";
import { UserAccountContext } from "./contexts/UserAccountContext";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    const fetchAndSetPosts = async () => {
      try {
        const res = await fetch(url, {
          signal: controller.signal,
          mode: "cors",
        });
        const d = await res.json();
        setData(d);
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
  return [data, setData];
};
useFetchData.propTypes = {
  url: PropTypes.string,
};

const usePostsMap = () => {
  const [posts] = useFetchData(import.meta.env.VITE_API_URL + "/posts");
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
  const [comments, setComments] = useFetchData(
    import.meta.env.VITE_API_URL + "/posts/" + postId + "/comments"
  );
  return [comments, setComments];
};
useComments.propTypes = {
  postId: PropTypes.number,
};

const useLocalStorage = (key) => {
  const store = {
    subscribe(listener) {
      window.addEventListener("storage", listener);
      return () => {
        window.removeEventListener("storage", listener);
      };
    },
    getSnapshot() {
      return localStorage.getItem(key);
    },
  };
  const value = useSyncExternalStore(store.subscribe, store.getSnapshot);
  return value;
};

const useFetchUsername = () => {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    const fetchAuthenticationStatusAndSetIt = async () => {
      const url = import.meta.env.VITE_API_URL + "/usernames";
      const auth = localStorage.getItem("auth");
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: auth,
          },
          signal: controller.signal,
        });
        if (!res.ok) {
          setUsername(null);
          return;
        }
        const username = await res.text();
        setUsername(username);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error(err);
        return;
      }
    };
    fetchAuthenticationStatusAndSetIt();
    return () => {
      controller.abort();
    };
  }, []);
  return username;
};

const useUsername = () => {
  const { username } = useContext(UserAccountContext);
  return username;
};

export {
  usePostsMap,
  useComments,
  useLocalStorage,
  useFetchUsername,
  useUsername,
};
