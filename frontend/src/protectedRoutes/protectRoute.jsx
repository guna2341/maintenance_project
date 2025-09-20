import { Outlet } from "react-router-dom";
import { UseAuthStore } from "../stores";
import { LoginPage } from "../pages/login";

export const ProtectRoute = () => {

  const token = UseAuthStore(e => e.token);

  if (!token) {
    return <LoginPage />;
  }
  else {
    return <Outlet />;
  }
}
