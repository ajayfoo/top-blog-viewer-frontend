import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import PostPage from "./components/PostPage";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage/index.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AccountPage from "./components/AccountPage/index.jsx";

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
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
