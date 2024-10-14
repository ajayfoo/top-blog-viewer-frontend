import { Outlet } from "react-router-dom";
import { usePostsMap } from "./hooks";
import MainNav from "./components/MainNav";
import classes from "./style.module.css";
import Spinner from "./components/Spinner";

function App() {
  const postsMap = usePostsMap();
  return (
    <div className={classes.app}>
      <MainNav />
      {postsMap ? <Outlet context={{ postsMap }} /> : <Spinner />}
    </div>
  );
}

export default App;
