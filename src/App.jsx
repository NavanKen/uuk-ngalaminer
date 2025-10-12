import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { RouterProvider } from "react-router";
import { router } from "./lib/router/router";
import { Toaster } from "sonner";

const App = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Toaster richColors position="top-center" />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
