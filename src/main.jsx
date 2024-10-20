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
import { getUsernameIfAuthorizedElseNull } from "./utils.js";

const redirectToHomeIfAuthorized = async () => {
  const username = await getUsernameIfAuthorizedElseNull();
  if (username) {
    return redirect("/");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        path: "/posts",
        children: [
          {
            path: "/posts/:postId",
            element: <PostPage />,
          },
        ],
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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
