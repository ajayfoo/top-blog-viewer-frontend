import { Outlet } from "react-router-dom";
import { usePostsMap } from "./hooks";
import MainNav from "./components/MainNav";
import classes from "./style.module.css";

function App() {
  const postsMap = usePostsMap();
  return (
    <div className={classes.app}>
      <MainNav />
      <Outlet context={{ postsMap }} />
    </div>
  );
}

export default App;
