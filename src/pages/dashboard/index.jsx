import { Button } from "../../components/ui/button";
import { useAuthStore } from "../../store/useAuthStore";

const Dashboard = () => {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div>
        <h1>Halaman Dashboard Protect</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </>
  );
};

export default Dashboard;
