import { Outlet } from "react-router-dom";
import LoginPage from "../pages/login";
import { UseAuthStore } from "../stores";

export const ProtectRoute = () => {
  const token = UseAuthStore(e => e.token);

  if (!token) {
    return <LoginPage />;
  }
  else {
    return <Outlet />;
  }
}
