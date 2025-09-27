import { useRouteError } from "react-router-dom";
import GoToHome from "../GoToHome";
import classes from "./style.module.css";
import ErrorIcon from "../Icons/ErrorIcon";
import { usePageTitle } from "../../hooks";
import { ErrorMessage } from "../../enums";

function ErrorPage() {
  usePageTitle("Error");
  const error = useRouteError();
  const showGoToHome = error?.message !== ErrorMessage.SERVER_DOWN;
  return (
    <main className={classes["error-page"]}>
      <article className={classes["error"]}>
        <header className={classes.header}>
          <ErrorIcon className={classes["error-icon"]} />
          <h1 className={classes.heading}>
            {error?.message || JSON.stringify(error)}
          </h1>
        </header>
        {showGoToHome && <GoToHome className={classes["go-to-home"]} />}
      </article>
    </main>
  );
}

export default ErrorPage;
