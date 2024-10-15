import { Outlet } from "react-router-dom";
import { useFetchUsername, usePostsMap } from "./hooks";
import MainNav from "./components/MainNav";
import classes from "./style.module.css";
import Spinner from "./components/Spinner";
import { UserAccountContext } from "./contexts/UserAccountContext";

function App() {
  const postsMap = usePostsMap();
  const username = useFetchUsername();
  return (
    <div className={classes.app}>
      <MainNav />
      {postsMap ? (
        <UserAccountContext.Provider value={{ username }}>
          <Outlet context={{ postsMap }} />
        </UserAccountContext.Provider>
      ) : (
        <div className={classes.center}>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default App;
