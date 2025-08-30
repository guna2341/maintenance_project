import apiClient from "../config/axios";

apiClient.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.metadata = { startTime: new Date() };

    return config;
  },
  (error) => Promise.reject(error)
);
