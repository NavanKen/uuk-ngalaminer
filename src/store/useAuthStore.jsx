import { create } from "zustand";
import { AuthLogin, AuthLogout, AuthMe } from "../service/auth.service";
import { toast } from "sonner";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,

  checkAuth: async () => {
    try {
      const res = await AuthMe();
      if (!res.status) {
        return;
      }
      set({ authUser: { ...res.data.auth, ...res.data.profile } });
    } catch (error) {
      console.error("error", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (payload) => {
    set({ isLoggingIn: true });
    try {
      const res = await AuthLogin(payload);
      if (!res.data) {
        toast.error(res.message);
        return;
      }
      set({ authUser: res.data.user });
      toast.success(res.message);
    } catch (error) {
      console.error("error", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await AuthLogout();
      set({ authUser: res.data });
      if (!res.data) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
    } catch (error) {
      toast.error("Error logging out");
      console.log("Logout error:", error);
    }
  },
}));
