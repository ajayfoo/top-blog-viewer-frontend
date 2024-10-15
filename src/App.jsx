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
      <UserAccountContext.Provider value={{ username }}>
        {postsMap ? (
          <Outlet context={{ postsMap }} />
        ) : (
          <div className={classes.center}>
            <Spinner />
          </div>
        )}
      </UserAccountContext.Provider>
    </div>
  );
}

export default App;
