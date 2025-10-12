import { Navigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

const RoleProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null;

  if (!authUser) {
    return <Navigate to="/auth/login" replace />;
  }

  const userRole = authUser.role || "guest";

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
