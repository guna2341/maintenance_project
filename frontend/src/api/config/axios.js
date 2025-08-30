import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  }
});

export default apiClient;