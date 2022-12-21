import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateValue } from "./context/StateProvider";
const ProtectedRoutes = () => {
  const [{ user }, dispatch] = useStateValue();
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
