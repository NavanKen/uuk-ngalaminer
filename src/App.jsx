import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { RouterProvider } from "react-router";
import { router } from "./lib/router/router";
import { Toaster } from "sonner";

const App = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Toaster richColors position="top-center" />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
