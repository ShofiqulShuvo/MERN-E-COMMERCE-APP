import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaSearch,
  FaSignOutAlt,
  FaUser,
  // FaBell,
  // FaFacebookMessenger
} from "react-icons/fa";
import ProfilePic from "../../assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/features/adminAuthSlice";

const Navbar = ({ toggle, setToggle }) => {
  const dispatch = useDispatch();
  const { profileInfo } = useSelector((state) => state.admin);

  const [showSearch, setShowSearch] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <Link to={"/admin"} className="logo d-flex align-items-center">
          <img src="assets/img/logo.png" alt="Logo" />
          <span className="d-none d-lg-block">Dashboard</span>
        </Link>
        <button
          className="btn btn-sm border-0 toggle-sidebar-btn"
          onClick={() => setToggle(!toggle)}
        >
          <FaBars />
        </button>
      </div>

      <div className={`search-bar ${showSearch ? "search-bar-show" : null}`}>
        <form
          className="search-form d-flex align-items-center"
          method="POST"
          action="#"
        >
          <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search keyword"
          />
          <button type="submit" title="Search">
            <FaSearch />
          </button>
        </form>
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item d-block d-lg-none">
            <button
              className="nav-link nav-icon search-bar-toggle btn "
              onClick={() => setShowSearch(!showSearch)}
            >
              <FaSearch />
            </button>
          </li>

          {/* Notification */}
          {/* <li className="nav-item dropdown">
            <button className="btn border-0 nav-link nav-icon"  data-bs-toggle="dropdown">
              <FaBell />
              <span className="badge bg-primary badge-number">4</span>
            </button>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
              <li className="notification-item">
                <i className="bi bi-exclamation-circle text-warning"></i>
                <div>
                  <h4>Lorem Ipsum</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>30 min. ago</p>
                </div>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="notification-item">
                <i className="bi bi-x-circle text-danger"></i>
                <div>
                  <h4>Atque rerum nesciunt</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>1 hr. ago</p>
                </div>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="notification-item">
                <i className="bi bi-check-circle text-success"></i>
                <div>
                  <h4>Sit rerum fuga</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>2 hrs. ago</p>
                </div>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="notification-item">
                <i className="bi bi-info-circle text-primary"></i>
                <div>
                  <h4>Dicta reprehenderit</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>4 hrs. ago</p>
                </div>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="dropdown-footer">
                <a href="#">Show all notifications</a>
              </li>
            </ul>
          </li> */}

          {/* Messages */}
          {/* <li className="nav-item dropdown">
            <button className="btn border-0  nav-link nav-icon"  data-bs-toggle="dropdown">
              <FaFacebookMessenger />
              <span className="badge bg-success badge-number">3</span>
            </button>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
              <li className="message-item">
                <a href="#">
                  <img
                    src="assets/img/messages-1.jpg"
                    alt=""
                    className="rounded-circle"
                  />
                  <div>
                    <h4>Maria Hudson</h4>
                    <p>
                      Velit asperiores et ducimus soluta repudiandae labore
                      officia est ut...
                    </p>
                    <p>4 hrs. ago</p>
                  </div>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="message-item">
                <a href="#">
                  <img
                    src="assets/img/messages-2.jpg"
                    alt=""
                    className="rounded-circle"
                  />
                  <div>
                    <h4>Anna Nelson</h4>
                    <p>
                      Velit asperiores et ducimus soluta repudiandae labore
                      officia est ut...
                    </p>
                    <p>6 hrs. ago</p>
                  </div>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="message-item">
                <a href="#">
                  <img
                    src="assets/img/messages-3.jpg"
                    alt=""
                    className="rounded-circle"
                  />
                  <div>
                    <h4>David Muldon</h4>
                    <p>
                      Velit asperiores et ducimus soluta repudiandae labore
                      officia est ut...
                    </p>
                    <p>8 hrs. ago</p>
                  </div>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="dropdown-footer">
                <a href="#">Show all messages</a>
              </li>
            </ul>
          </li> */}

          {/* Profile */}
          <li className="nav-item dropdown pe-3">
            <button
              className=" btn border-0 nav-link nav-profile d-flex align-items-center pe-0"
              data-bs-toggle="dropdown"
            >
              <img
                src={profileInfo.image ? profileInfo.image.link : ProfilePic}
                alt=""
                className="rounded-circle"
                style={{ height: "35px", width: "35px" }}
              />
              <span className="d-none d-md-block dropdown-toggle ps-2"></span>
            </button>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>{profileInfo.name}</h6>
                <span>{profileInfo.email}</span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to={"/admin/profile"}
                >
                  <span className="nav-item-drop-icon">
                    <FaUser />
                  </span>
                  <span>My Profile</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <button
                  className="dropdown-item d-flex align-items-center"
                  onClick={handleLogout}
                >
                  <span className="nav-item-drop-icon">
                    <FaSignOutAlt />
                  </span>
                  <span>Sign Out</span>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
