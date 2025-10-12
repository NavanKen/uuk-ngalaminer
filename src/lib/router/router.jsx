import { createBrowserRouter } from "react-router";
import LandingPages from "../../pages";
import LoginPages from "../../pages/auth/login";
import RegisterPages from "../../pages/auth/register";
import AuthLayout from "../../layout/AuthLayout";
import RoleProtectedRoute from "../../layout/RoleProtectedRoute";
import DashboardLayoutWrapper from "../../layout/DashboardLayoutWrapper";
import { Outlet } from "react-router";
import Lokasi from "../../components/Dashboard/lokasi";
import KategoriPages from "../../pages/dashboard/kategori";
import KulinerPages from "../../pages/dashboard/kuliner";
import ProfilePages from "../../components/Dashboard/profile";
import KulinerPage from "../../pages/kuliner";
import KulinerDetailPage from "../../pages/kuliner/detail";
import LokasiPage from "../../pages/lokasi";
import LokasiDetailPage from "../../pages/lokasi/detail";
import DashboardPages from "../../pages/dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPages />,
  },
  {
    path: "/kuliner",
    element: <KulinerPage />,
  },
  {
    path: "/kuliner/:id",
    element: <KulinerDetailPage />,
  },
  {
    path: "/lokasi",
    element: <LokasiPage />,
  },
  {
    path: "/lokasi/:id",
    element: <LokasiDetailPage />,
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
        <DashboardLayoutWrapper>
          <Outlet />
        </DashboardLayoutWrapper>
      </AuthLayout>
    ),
    children: [
      {
        index: true,
        element: <DashboardPages />,
      },
      {
        path: "lokasi",
        element: (
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <Lokasi />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "category",
        element: (
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <KategoriPages />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "kuliner",
        element: (
          <RoleProtectedRoute allowedRoles={["admin", "user"]}>
            <KulinerPages />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <ProfilePages />
          </RoleProtectedRoute>
        ),
      },
    ],
  },
]);
