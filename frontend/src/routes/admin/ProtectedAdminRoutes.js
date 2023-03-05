import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoutes = () => {
  const { isLoggedIn } = useSelector((state) => state.admin);

  if (isLoggedIn === undefined) {
    return null;
  } else if (isLoggedIn) {
    return <Outlet />;
  } else if (isLoggedIn === false) {
    return <Navigate to={"/admin/login"} />;
  }
};

export default ProtectedAdminRoutes;
