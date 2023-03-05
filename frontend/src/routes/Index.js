import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminRoutes from "./admin/AdminRoutes";
import ClientRoutes from "./client/ClientRoutes";

const Index = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<ClientRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </>
  );
};

export default Index;
