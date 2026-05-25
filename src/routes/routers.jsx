import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/login.jsx";
import MainPage from "../pages/MainPage.jsx";
import MainLayout from "../layout/MainLayout.jsx";
import RootRedirect from "./RootRedirect.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
  },
  {
    path: "/app/main-page",
    element: <Navigate to="/app/dashboard" replace />,
  },
  {
    path: "/app/login",
    element: <Login />,
  },
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <MainPage />,
      },
      // {
      //   path: "books",
      //   element: <BooksPage />,
      // },
      // {
      //   path: "categories",
      //   element: <CategoriesPage />,
      // },
    ],
  },
]);
