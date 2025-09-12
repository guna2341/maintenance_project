import secureLocalStorage from "react-secure-storage";
import apiClient from "../config/axios";
import { UseAuthStore } from "../../stores";

apiClient.interceptors.request.use(
  (config) => {
  const token = UseAuthStore(e => e.token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.metadata = { startTime: new Date() };

    return config;
  },
  (error) => Promise.reject(error)
);
