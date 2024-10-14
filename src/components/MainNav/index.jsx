import { NavLink } from "react-router-dom";
import classes from "./style.module.css";

function MainNav() {
  return (
    <nav className={classes["main-nav"]}>
      <div className={classes["nav-items"]}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? classes.active : "")}
        >
          Home
        </NavLink>
      </div>
    </nav>
  );
}

export default MainNav;
