import { Link } from "react-router-dom";
import classes from "./style.module.css";

function MainNav() {
  return (
    <nav className={classes["main-nav"]}>
      <div className={classes["nav-items"]}>
        <Link to="/">Home</Link>
      </div>
    </nav>
  );
}

export default MainNav;
