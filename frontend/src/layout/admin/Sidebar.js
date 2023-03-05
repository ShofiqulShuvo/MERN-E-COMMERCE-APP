import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  // FaChartBar,
  // FaAccusoft,
  // FaArrowDown,
  // FaDiagnoses,
  // FaIdBadge,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <NavLink className="nav-link " to="/admin/dashboard" end>
              <span className="sidebar-nav-link-icon">
                <FaChartPie />
              </span>
              <span>Dashboard</span>
            </NavLink>
          </li>

          {/* <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#components-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <span className="sidebar-nav-link-icon">
                <FaChartBar />
              </span>
              <span>Components</span>
              <span className="ms-auto down-icon">
                <FaArrowDown />
              </span>
            </a>
            <ul
              id="components-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <a href="components-alerts.html">
                  <span className="sidebar-nav-link-icon">
                    <FaDiagnoses />
                  </span>
                  <span>Alerts</span>
                </a>
              </li>
              <li>
                <a href="components-accordion.html">
                  <span className="sidebar-nav-link-icon">
                    <FaAccusoft />
                  </span>
                  <span>Accordion</span>
                </a>
              </li>
              <li>
                <a href="components-badges.html">
                  <span className="sidebar-nav-link-icon">
                    <FaIdBadge />
                  </span>
                  <span>Badges</span>
                </a>
              </li>
            </ul>
          </li> */}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
