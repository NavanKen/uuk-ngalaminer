import { useAuthStore } from "../store/useAuthStore";
import DashboardLayout from "./DashboardLayout/DashboardLayout";

const DashboardLayoutWrapper = ({ children }) => {
  const { authUser } = useAuthStore();
  
  // Get user role, default to 'user' if not found
  const userRole = authUser?.role || "user";

  return (
    <DashboardLayout type={userRole}>
      {children}
    </DashboardLayout>
  );
};

export default DashboardLayoutWrapper;
