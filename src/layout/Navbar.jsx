import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiMenuUnfold2Line } from "react-icons/ri";
import logo from "../assets/logo.png"; // Adjust the path as needed
const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const notificationRef = useRef(null);
useEffect(() => {
  const storedDetail = localStorage.getItem("login-detail");
  if (storedDetail) {
    try {
      const parsedDetail = JSON.parse(storedDetail);
      setUserName(parsedDetail.customerName || "Admin");
    } catch (err) {
      console.error("Failed to parse login-detail:", err);
      setUserName("User");
    }
  } else {
    setUserName("User");
  }
}, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotification(false);
      }
    };

    if (showNotification) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotification]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("login-detail");
    localStorage.removeItem("userRole");
      navigate("/");
  };

  return (
    <nav className="navbar navbar-light p-1">
      <div className="container-fluid">
        <div className="d-flex justify-content-between w-100 align-items-center">
          {/* Left side */}
          <div className="d-flex align-items-center justify-content-center ms-3">
            {/* Logo */}
            <Link to="/" className="d-flex align-items-center ">
              <img
                src={logo}
                alt="Ladybug Lending Logo"
                style={{ height: 80, width: "auto", objectFit: "contain" }}
                className="me-3"
              />
            </Link>
            {/* Sidebar Toggle */}
            <div
              className="nav-toggle-icon ms-5 mt-2 " 
              onClick={toggleSidebar}
              style={{ cursor: "pointer" }}
            >
              <div>
                <RiMenuUnfold2Line size={28} />
              </div>
            </div>
          </div>

          {/* Middle spacer */}
          <div className="flex-grow-1 d-none d-lg-block"></div>

          {/* Right side */}
          <div className="d-flex align-items-center position-relative">
            {/* Notification bell */}
            <div className="position-relative me-3">
              <button
                className="btn btn-sm p-0 border-0 bg-transparent"
                onClick={() => setShowNotification(!showNotification)}
              >
                {/* <i className="fa-regular fa-bell fs-4 text-success"></i> */}
              </button>

              {/* Notification Card */}
              {showNotification && (
                <div
                  ref={notificationRef}
                  className="position-absolute end-0 mt-2 shadow-sm rounded-3 border border-success bg-white"
                  style={{ width: "280px", zIndex: 1000 }}
                >
                  <div className="border-bottom px-3 py-2 d-flex justify-content-between align-items-center bg-success bg-opacity-10 rounded-top">
                    <strong className="text-white">Notifications</strong>
                    <button
                      className="btn-close"
                      onClick={() => setShowNotification(false)}
                      style={{ fontSize: "0.8rem" }}
                    ></button>
                  </div>

                  <div className="p-3">
                    <div className="d-flex align-items-start gap-2 mb-3">
                      <i className="fas fa-bell mt-1 text-success"></i>
                      <div className="small text-dark">
                        <div className="fw-semibold">
                          3 new transaction alerts
                        </div>
                        <div className="text-muted small">Just now</div>
                      </div>
                    </div>

                    <div className="d-flex align-items-start gap-2 mb-3">
                      <i className="fas fa-check-circle mt-1 text-success"></i>
                      <div className="small text-dark">
                        <div className="fw-semibold">
                          Withdrawal approved
                        </div>
                        <div className="text-muted small">15 minutes ago</div>
                      </div>
                    </div>

                    <div className="d-flex align-items-start gap-2">
                      <i className="fas fa-file-alt mt-1 text-success"></i>
                      <div className="small text-dark">
                        <div className="fw-semibold">
                          Monthly report available
                        </div>
                        <div className="text-muted small">1 hour ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile dropdown */}
            <div className="dropdown">
              <div
                className="d-flex align-items-center gap-2"
                style={{ cursor: "pointer" }}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="avatar online">
                  <i className="fa-solid fa-circle-user fs-2 text-success"></i>
                </div>
              </div>

              <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 p-2 mt-2">
                <li>
                  <h6 className="dropdown-header small px-3 py-1 fw-bold text-success">
                    ACCOUNT
                  </h6>
                </li>

                <li className="mb-2">
                  <Link
                    className="dropdown-item d-flex align-items-center gap-2 px-3 py-2 rounded-2 text-success"
                    to="/updateprofile"
                  >
                    <i className="fas fa-user-pen text-success"></i>
                    Profile
                  </Link>
                </li>

                <li className="mb-2">
                  <Link
                    className="dropdown-item d-flex align-items-center gap-2 px-3 py-2 rounded-2 text-success"
                    to="/changepassword"
                  >
                    <i className="fas fa-user-pen text-success"></i>
                    Change Password
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider my-2" />
                </li>

                <li className="mb-1">
                  <button
                    className="dropdown-item d-flex align-items-center gap-2 px-3 py-2 rounded-2 text-success border-0"
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt text-success"></i>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;














