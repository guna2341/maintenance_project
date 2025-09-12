import secureLocalStorage from "react-secure-storage";
import apiClient from "../config/axios";

apiClient.interceptors.request.use(
  (config) => {
    const token = secureLocalStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.metadata = { startTime: new Date() };

    return config;
  },
  (error) => Promise.reject(error)
);
