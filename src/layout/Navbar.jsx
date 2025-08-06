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
              <img src={logo} alt="Ladybug Lending Logo"  style={{ height: 90, width: "auto", objectFit: "contain" }}  className="me-3"/>
              {/* <img src="https://kiaantechnology.com/img/kt.png" alt="Ladybug Lending Logo"  style={{ height: 90, width: "auto", objectFit: "contain" }}  className="me-3"/> */}
            </Link>
            {/* Sidebar Toggle */}
            <div className="nav-toggle-icon ms-5 mt-2 "   onClick={toggleSidebar}  style={{ cursor: "pointer" }}>
              <div>
                <RiMenuUnfold2Line size={28} />
              </div>
            </div>
          </div>

          {/* Middle spacer */}
          <div className="flex-grow-1 d-none d-lg-block"></div>

          {/* Right side */}
          <div className="d-flex align-items-center position-relative">
            {/* Profile dropdown */}
          <span className="me-3 fw-semibold text-success">   Hi, {userName}</span>
            <div className="dropdown">
              <div  className="d-flex align-items-center gap-2"
                style={{ cursor: "pointer" }}
                data-bs-toggle="dropdown"
                aria-expanded="false">
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
                    to="/updateprofile">
                    <i className="fas fa-user-pen text-success"></i>
                    Profile
                  </Link>
                </li>

                <li className="mb-2">
                  <Link
                    className="dropdown-item d-flex align-items-center gap-2 px-3 py-2 rounded-2 text-success"
                    to="/changepassword">
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
                    onClick={handleLogout}>
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














