import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import PostPage from "./components/PostPage";
import HomePage from "./components/HomePage/index.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

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
        path: "/:postId",
        element: <PostPage />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
