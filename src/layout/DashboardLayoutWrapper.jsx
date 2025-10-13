import { useAuthStore } from "../store/useAuthStore";
import DashboardLayout from "./DashboardLayout/DashboardLayout";

const DashboardLayoutWrapper = ({ children }) => {
  const { authRole } = useAuthStore();

  const userRole = authRole;

  return <DashboardLayout type={userRole}>{children}</DashboardLayout>;
};

export default DashboardLayoutWrapper;
