import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import PostPage from "./components/PostPage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import HomePage from "./components/HomePage/index.jsx";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import AccountPage from "./components/AccountPage/index.jsx";
import { getUserIfAuthorizedElseNull } from "./utils.js";
import ErrorPage from "./components/ErrorPage/index.jsx";
import NotFoundPage from "./components/NotFoundPage/index.jsx";
import { ErrorMessage } from "./enums.js";

const redirectToHomeIfAuthorized = async () => {
  const user = await getUserIfAuthorizedElseNull();
  if (user) {
    return redirect("/");
  }
  return null;
};

const checkServerStatus = async () => {
  const url = import.meta.env.VITE_API_URL + "/posts";
  try {
    await fetch(url, {
      mode: "cors",
    });
    return null;
  } catch (error) {
    if (error?.message === "Failed to fetch") {
      error.message = ErrorMessage.SERVER_DOWN;
    }
    throw error;
  }
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: checkServerStatus,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/account",
        element: <AccountPage />,
      },
      {
        path: "/posts/:postId",
        element: <PostPage />,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
    loader: redirectToHomeIfAuthorized,
  },
  {
    path: "/auth/sign-up",
    element: <SignUpPage />,
    loader: redirectToHomeIfAuthorized,
  },
  {
    path: "*",
    element: <NotFoundPage />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
