import {
  LayoutDashboard,
  Utensils,
  MapPin,
  Users,
  FolderTree,
} from "lucide-react";

const sidebarAdmin = [
  {
    key: "Dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    key: "Category",
    label: "Category",
    href: "/dashboard/category",
    icon: <FolderTree size={18} />,
  },
  {
    key: "Lokasi",
    label: "Lokasi",
    href: "/dashboard/lokasi",
    icon: <MapPin size={18} />,
  },
  {
    key: "Kuliner",
    label: "Kuliner",
    href: "/dashboard/kuliner",
    icon: <Utensils size={18} />,
  },
  {
    key: "Profile",
    label: "Profile",
    href: "/dashboard/profile",
    icon: <Users size={18} />,
  },
];

const sidebarUser = [
  {
    key: "Dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    key: "Kuliner",
    label: "Kuliner",
    href: "/dashboard/kuliner",
    icon: <Utensils size={18} />,
  },
];

export { sidebarAdmin, sidebarUser };
