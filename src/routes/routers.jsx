import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App.jsx";
import Login from "../pages/login.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/app/login" replace />,
  },
   {
    path: "/app/login",
    element: <Login />,
  },
]);