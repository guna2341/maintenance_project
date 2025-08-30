import apiClient from "../config/axios";
import handleApiError from "../utils/errorHandler";

apiClient.interceptors.response.use(
  (response) => {
    const start = response?.config?.metadata?.startTime;
    if (start) {
      const duration = new Date() - new Date(start);
        console.log(duration);
    }
    return response;
  },
    (error) => {
        const start = error?.config?.metadata?.startTime;
        if (start) {
          const duration = new Date() - new Date(start);
          console.log("Request failed after:", duration + "ms");
          handleApiError(error);
        }
    return Promise.reject(error);
  }
);