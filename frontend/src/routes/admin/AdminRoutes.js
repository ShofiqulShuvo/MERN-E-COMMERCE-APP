import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "../../assets/admin/css/style.css";
import useAdminAuth from "../../auth/useAdminAuth";

import AdminLayout from "../../layout/admin/AdminLayout";
import Dashboard from "../../pages/admin/Dashboard";
import Login from "../../pages/admin/Login";
import NoPermeion from "../../pages/admin/NoPermeion";
import NotFound from "../../pages/admin/NotFound";
import Profile from "../../pages/admin/Profile";
import UserAdd from "../../pages/admin/UserAdd";
import Users from "../../pages/admin/Users";
import UserSingle from "../../pages/admin/UserSingle";
import PrivateAdminRoute from "./PrivateAdminRoute";
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
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserSingle />} />

            <Route path="/nopermision" element={<NoPermeion />} />
            <Route path="/*" element={<NotFound />} />
          </Route>

          {/* Private route for admin */}
          <Route element={<AdminLayout />}>
            <Route element={<PrivateAdminRoute />}>
              <Route path="/users/add" element={<UserAdd />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default AdminRoutes;
