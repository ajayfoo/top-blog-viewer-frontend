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
        <NavLink
          to="/account"
          className={({ isActive }) => (isActive ? classes.active : "")}
        >
          Account
        </NavLink>
      </div>
    </nav>
  );
}

export default MainNav;
