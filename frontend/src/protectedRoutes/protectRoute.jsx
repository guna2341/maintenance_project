import { Outlet } from "react-router-dom";
import LoginPage from "../pages/login";

export const ProtectRoute = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <LoginPage/>
  }
  else {
    return <Outlet />
  }
}
