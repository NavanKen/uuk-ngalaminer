import { Menu, User } from "lucide-react";

const DashboardNavbar = ({ toggleMenu }) => {
  return (
    <nav className="bg-white border-b h-16 border-gray-200 flex items-center w-full justify-between px-6">
      <button
        onClick={toggleMenu}
        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
      >
        <Menu className="w-6 h-6" />
      </button>
    </nav>
  );
};

export default DashboardNavbar;
