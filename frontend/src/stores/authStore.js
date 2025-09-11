import { create } from "zustand";
import apiClient from "../api/config/axios";
import endpoints from "../api/config/endpoints";

export const UseAuthStore = create((set, get) => ({
  token: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
  userName: localStorage.getItem("userName"),
  role: localStorage.getItem("role"),
  setAuthStore: (key, value) => {
    set({ [key]: value });
  },

  login: async (email, password) => {
    try {
      const response = await apiClient.post(endpoints.LOGIN, {
        email,
        password,
      });
      set({ token: response?.data?.token, email: email, userName: response?.data?.userData?.userName, role: response?.data?.userData?.role });
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("email", email);
      localStorage.setItem("userName", response?.data?.userData?.userName);
      localStorage.setItem("role", response?.data?.userData?.role);
      return { state: true, message: "Logged in successfully" };
    } catch (err) {
      return { state: false, message: err?.response?.data?.message };
    }
  },
  logout: () => {
    set({token:null});
    localStorage.clear();
  },
}));
