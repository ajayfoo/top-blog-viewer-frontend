import { Outlet } from "react-router-dom";
import { usePostsMap } from "./hooks";

function App() {
  const postsMap = usePostsMap();
  return (
    <div>
      <nav>links</nav>
      <br />
      <Outlet context={{ postsMap }} />
    </div>
  );
}

export default App;
