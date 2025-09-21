import { Outlet } from "react-router-dom";
import { useFetchUser, usePageTitle, usePostsMap } from "./hooks";
import MainNav from "./components/MainNav";
import classes from "./style.module.css";
import Spinner from "./components/Spinner";
import { UserContext } from "./contexts";

function App() {
  usePageTitle("TOP Blog");
  const postsMap = usePostsMap();
  const [user, setUser] = useFetchUser();
  const setUserIsAuthor = (isAuthor) => {
    setUser({
      ...user,
      isAuthor,
    });
  };
  return (
    <div className={classes.app}>
      <MainNav />
      {postsMap ? (
        <UserContext.Provider value={{ user, setUserIsAuthor }}>
          <Outlet context={{ postsMap }} />
        </UserContext.Provider>
      ) : (
        <div className={classes.center}>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default App;
