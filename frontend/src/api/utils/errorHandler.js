import { addToast } from "@heroui/toast";
import secureLocalStorage from "react-secure-storage";

const handleApiError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    switch (status) {
      case 401:

        function handleToast() {
          addToast({
            title: "Invalid token",
            variant: "warning",
          });
        }
        
        handleToast();
        secureLocalStorage.removeItem("auth");
        secureLocalStorage.clear();
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
        break;
      case 403:
        console.error("Access denied");
        break;
      case 404:
        console.error("Resource not found");
        break;
      case 409:
        console.error("User already exists");
        break;
      case 500:
        console.error("Server error");
        break;
      default:
        console.error("API Error:", data.message || "Unknown error");
    }

    return Promise.reject({
      status,
      message: data.message || "An error occurred",
      data: data,
    });
  } else if (error.request) {
    console.error("Network Error:", error.message);
    return Promise.reject({
      status: 0,
      message: "Network error. Please check your connection.",
    });
  } else {
    console.error("Error:", error.message);
    return Promise.reject({
      status: -1,
      message: error.message || "An unexpected error occurred",
    });
  }
};

export default handleApiError;