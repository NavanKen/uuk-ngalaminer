import { useMemo, useState } from "react";
import DashboardSidebar from "./DashboardLayoutSidebar/DashboardSidebar";
import { sidebarAdmin, sidebarUser } from "../../constant/dashboard.constant";
import DashboardNavbar from "./DashboardLayoutNavbar/DashboardNavbar";

const DashboardLayout = (props) => {
  const { children, type } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const sidebarItems = useMemo(() => {
    if (type === "user") return sidebarUser;
    else if (type === "admin") return sidebarAdmin;
  }, [type]);

  return (
    <>
      <div className="flex h-screen w-full bg-gray-50">
        <DashboardSidebar sidebarItems={sidebarItems} IsOpen={isOpen} />

        <div className="flex flex-col w-full ">
          <DashboardNavbar toggleMenu={toggleMenu} />

          <main className="p-8 overflow-y-auto">{children}</main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
