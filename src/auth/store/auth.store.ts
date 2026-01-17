import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { LoginAction } from "../actions/Login.action";
import { checkAuthAction } from "../actions/check-auth.action";
import { RegisterAction } from "../actions/Register.action";

type AuthStatus = "authenticated" | "not-authenticated" | "checking";

type AuthState = {
  // Properties
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;
  // Getters
  isAdmin: () => boolean;
  // Actions
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  // Implementación del Store
  user: null,
  token: null,
  authStatus: "checking",
  // Getters
  isAdmin: () => {
    const userRoles = get().user?.roles;
    return userRoles ? userRoles.includes("admin") : false;
  },
  // Actions
  register: async (fullName: string, email: string, password: string) => {
    try {
      const data = await RegisterAction(fullName, email, password);
      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token, authStatus: "authenticated" });
    } catch (error) {
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "not-authenticated" });
      return false;
    }
    return true;
  },
  login: async (email: string, password: string) => {
    try {
      const data = await LoginAction(email, password);
      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token, authStatus: "authenticated" });
    } catch (error) {
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "not-authenticated" });
      return false;
    }
    return true;
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, authStatus: "not-authenticated" });
  },
  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();
      set({ user: user, token: token, authStatus: "authenticated" });
      return true;
    } catch (error) {
      set({ user: null, token: null, authStatus: "not-authenticated" });
      return false;
    }
  },
}));
