import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "../../assets/admin/css/style.css";
import useAdminAuth from "../../auth/useAdminAuth";

import AdminLayout from "../../layout/admin/AdminLayout";
import Dashboard from "../../pages/admin/Dashboard";
import Login from "../../pages/admin/Login";
import Profile from "../../pages/admin/Profile";
import ProtectedAdminRoutes from "./ProtectedAdminRoutes";

const AdminRoutes = () => {
  useAdminAuth();

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedAdminRoutes />}>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Navigate to={"/admin/dashboard"} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default AdminRoutes;
