import { Navigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

const AuthLayout = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null;

  if (!authUser) return <Navigate to="/auth/login" replace />;

  return children;
};

export default AuthLayout;
