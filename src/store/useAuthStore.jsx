import { create } from "zustand";
import {
  AuthLogin,
  AuthLogout,
  AuthMe,
  AuthRegister,
} from "../service/auth.service";
import { toast } from "sonner";

export const useAuthStore = create((set) => ({
  authUser: null,
  authRole: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,

  setUser: (user) => set({ authUser: user }),

  checkAuth: async () => {
    try {
      const res = await AuthMe();
      if (!res.status) {
        return;
      }

      set({
        authUser: { ...res.data.auth, ...res.data.profile },
        authRole: res.data.profile.role,
      });
    } catch (error) {
      console.error("error", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (payload) => {
    set({ isSigningUp: true });
    try {
      const res = await AuthRegister(payload);

      if (!res.status) {
        toast.error(res.message);
        return;
      }

      const user = res.data?.user || res.data?.session?.user;
      if (user) {
        set({ authUser: user });
      }

      toast.success(res.message);
      return res.data.user;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Terjadi kesalahan saat mendaftar");
    } finally {
      set({ isSigningUp: false });
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
      return res.data.user;
    } catch (error) {
      console.error("error", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await AuthLogout();
      set({ authUser: null });
      if (!res.status) {
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
