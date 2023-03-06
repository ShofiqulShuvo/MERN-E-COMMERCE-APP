import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateAdminRoute = () => {
  const { profileInfo, isLoggedIn } = useSelector((state) => state.admin);

  if (isLoggedIn === undefined) {
    return null;
  } else if (profileInfo.role === "admin" && isLoggedIn === true) {
    return <Outlet />;
  } else {
    return <Navigate to={"/admin/nopermision"} />;
  }
};

export default PrivateAdminRoute;
