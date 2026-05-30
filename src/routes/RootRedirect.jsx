import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RootRedirect() {
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  return (
    <Navigate to={isAuthenticated ? "/app/dashboard" : "/app/login"} replace />
  );
}
