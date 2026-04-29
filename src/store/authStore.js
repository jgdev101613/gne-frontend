import { create } from "zustand";
import API from "../lib/axios";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: true,

  // ========================
  // SIGNUP
  // ========================
  signup: async (email, password, name) => {
    set({ isLoading: true });
    try {
      const { data } = await API.post("/auth/signup", {
        email,
        password,
        name,
      });

      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });

      return data;
    } catch (error) {
      set({ isLoading: false });
      throw error.message;
    }
  },

  // ========================
  // LOGIN
  // ========================
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      // If using JWT
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });

      return data;
    } catch (error) {
      set({ isLoading: false });
      throw error.message;
    }
  },

  // ========================
  // LOGOUT
  // ========================
  logout: async () => {
    set({ isLoading: true });
    try {
      await API.post("/auth/logout");

      localStorage.removeItem("token");

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error.message;
    }
  },

  // ========================
  // VERIFY EMAIL
  // ========================
  verifyEmail: async (code, email) => {
    set({ isLoading: true });
    try {
      const { data } = await API.post("/auth/verify-email", {
        code,
        email,
      });

      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });

      return data;
    } catch (error) {
      set({ isLoading: false });
      throw error.message;
    }
  },

  // ========================
  // RESEND CODE
  // ========================
  newVerificationCode: async (email) => {
    set({ isLoading: true });
    try {
      const { data } = await API.post("/auth/generate-verification-token", {
        email,
      });

      set({ isLoading: false });
      return data;
    } catch (error) {
      set({ isLoading: false });
      throw error.message;
    }
  },

  // ========================
  // CHECK AUTH (PERSIST)
  // ========================
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const { data } = await API.get("/auth/check-auth");

      set({
        user: data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
      });
    }
  },

  // ========================
  // FORGOT PASSWORD
  // ========================
  forgotPassword: async (email) => {
    set({ isLoading: true });
    try {
      const { data } = await API.post("/auth/forgot-password", { email });

      set({ isLoading: false });
      return data;
    } catch (error) {
      set({ isLoading: false });
      throw error.message;
    }
  },

  // ========================
  // RESET PASSWORD
  // ========================
  resetPassword: async (token, password) => {
    set({ isLoading: true });
    try {
      const { data } = await API.post(`/auth/reset-password/${token}`, {
        password,
      });

      set({ isLoading: false });
      return data;
    } catch (error) {
      set({ isLoading: false });
      throw error.message;
    }
  },
}));
