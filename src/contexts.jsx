import { createContext } from "react";
import { UserStatus } from "./utils";

const UserContext = createContext({
  user: { status: UserStatus.CHECKING },
  setUserIsAuthor: () => {},
});

export { UserContext };
