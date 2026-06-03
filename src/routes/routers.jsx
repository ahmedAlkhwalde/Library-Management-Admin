import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/login.jsx";
import CategoriesPage from "../pages/CategoriesPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import MainLayout from "../layout/MainLayout.jsx";
import RootRedirect from "./RootRedirect.jsx";
import BooksPage from "../pages/BooksPage.jsx";
import UserPage from "../pages/User.jsx";

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
        element: <DashboardPage />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
      },
      {
        path: "books",
        element: <BooksPage />,
      },
      {
        path: "users",
        element: <UserPage />,
      },
    ],
  },
]);
