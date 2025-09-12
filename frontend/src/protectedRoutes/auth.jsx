import React from 'react'
import { Outlet } from 'react-router-dom';

export const Auth = () => {
  
    React.useEffect(() => {
      const handleStorage = (event) => {
        if (event.key === "auth" && event.newValue === null) {
          logout();
        }
        if (event.key == "auth" && event.newValue !== null) {
          login();
        }
      };

      window.addEventListener("storage", handleStorage);
      return () => {
        window.removeEventListener("storage", handleStorage);
      };
    }, []);

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const login = () => {
      window.location.href = `/${BASE_URL}/dashboard`;
    };

    const logout = () => {
      window.location.href = "/login";
    };
    return <Outlet /> ;
}
