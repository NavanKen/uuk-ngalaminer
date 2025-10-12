import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router";

const DashboardSidebar = ({ sidebarItems, IsOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (href) => {
    if (href === "/dashboard") {
      return currentPath === "/dashboard";
    }
    return currentPath.startsWith(href);
  };

  return (
    <div
      className={cn(
        "fixed z-50 flex h-screen w-full max-w-[300px] -translate-x-full flex-col border-r border-default-200 bg-white px-4 py-6 transition-all lg:relative lg:translate-x-0",
        { "translate-x-0": IsOpen }
      )}
    >
      <div className="mb-7 p-3">
        <h1 className="font-bold text-2xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          NgalamIner
        </h1>
      </div>

      <div className="space-y-3">
        {sidebarItems.map((item) => (
          <Link
            key={item.key}
            to={item.href}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all",
              isActive(item.href)
                ? "text-white bg-gradient-to-br from-orange-400 to-orange-600 font-semibold"
                : "hover:bg-gray-100"
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardSidebar;
