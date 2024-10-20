import { formatDistance } from "date-fns";

const getElapsedTime = (fromStr) => {
  const fromDate = new Date(fromStr);
  const elapsedTime = formatDistance(new Date(), fromDate, { addSuffix: true });
  return elapsedTime;
};

const UserStatus = {
  CHECKING: "checking",
  AUTHORIZED: "authorized",
  UNAUTHORIZED: "unauthorized",
};

export { getElapsedTime, UserStatus };
