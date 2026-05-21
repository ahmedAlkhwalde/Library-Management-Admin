import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/login.jsx";
import MainPage from "../pages/MainPage.jsx";

function RootRedirect() {
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  return (
    <Navigate to={isAuthenticated ? "/app/main-page" : "/app/login"} replace />
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
  },
  {
    path: "/app/login",
    element: <Login />,
  },
  {
    path: "/app/main-page",
    element: <MainPage />,
  },
]);
