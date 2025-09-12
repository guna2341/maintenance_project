import { create } from "zustand";
import apiClient from "../api/config/axios";
import endpoints from "../api/config/endpoints";
import secureLocalStorage from "react-secure-storage";

export const UseAuthStore = create((set, get) => ({
  token: secureLocalStorage.getItem("token"),
  email: secureLocalStorage.getItem("email"),
  userName: secureLocalStorage.getItem("userName"),
  role: secureLocalStorage.getItem("role"),
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
      secureLocalStorage.setItem("token", response?.data?.token);
      localStorage.setItem("auth","logged-in");
      secureLocalStorage.setItem("email", email);
      secureLocalStorage.setItem("userName", response?.data?.userData?.userName);
      secureLocalStorage.setItem("role", response?.data?.userData?.role);
      return { state: true, message: "Logged in successfully" };
    } catch (err) {
      return { state: false, message: err };
    }
  },
  logout: () => {
    set({token:null});
    localStorage.removeItem("auth");
    secureLocalStorage.clear();
  },
}));
