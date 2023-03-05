import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className={`${toggle ? "toggle-sidebar" : null}`}>
      <Navbar toggle={toggle} setToggle={setToggle} />
      <Sidebar />
      <main id="main" className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
