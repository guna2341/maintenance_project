import { Outlet, Redirect } from "react-router-dom";

export const ProtectRoute = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Redirect to="/login" />
  }
  else {
    return <Outlet />
  }
}
