import { useEffect, useState } from "react";
import HomePage from "./components/HomePage";

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const fetchAndSetPosts = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL + "/posts", {
          signal: controller.signal,
          mode: "cors",
        });
        const arr = await res.json();
        setPosts(arr);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error(err);
      }
    };
    fetchAndSetPosts();
    return () => {
      controller.abort();
    };
  }, []);
  return <HomePage posts={posts} />;
}

export default App;
