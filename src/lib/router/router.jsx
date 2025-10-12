import { createBrowserRouter } from "react-router";
import LandingPages from "../../pages";
import LoginPages from "../../pages/auth/login";
import RegisterPages from "../../pages/auth/register";
import AuthLayout from "../../layout/AuthLayout";
import Dashboard from "../../pages/dashboard";
import DashboardLayout from "../../layout/DashboardLayout/DashboardLayout";
import { Outlet } from "react-router";
import Lokasi from "../../components/Dashboard/lokasi";
import KategoriPages from "../../pages/dashboard/kategori";
import KulinerPages from "../../pages/dashboard/kuliner";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPages />,
  },
  {
    path: "/auth/login",
    element: <LoginPages />,
  },
  {
    path: "/auth/register",
    element: <RegisterPages />,
  },
  {
    path: "/dashboard",
    element: (
      <AuthLayout>
        <DashboardLayout type="admin">
          <Outlet />
        </DashboardLayout>
      </AuthLayout>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "lokasi",
        element: <Lokasi />,
      },
      {
        path: "category",
        element: <KategoriPages />,
      },
      {
        path: "kuliner",
        element: <KulinerPages />,
      },
    ],
  },
]);
