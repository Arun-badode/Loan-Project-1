import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar navbar-light">
      <div className="container-fluid">
        <div className="d-flex justify-content-between w-100 align-items-center">
          {/* Left side - Brand and company name */}
          <div className="d-flex align-items-center">
            <div className="nav-bran me-3">
              <a className="nav-brand fw-bold" href="#">
                Hi, Jacob Hills
              </a>
              
              <p className="p-0 m-0 d-none d-md-block">Jocob Hills Group Of Company</p>
            </div>
            <div className="nav-toggle-icon me-3 d-lg-none" onClick={toggleSidebar}>
              <button className="btn p-0 border-0 bg-transparent">
                <i className="fa fa-bars fs-4" aria-hidden="true"></i>
              </button>
            </div>
          </div>

          {/* Middle - Empty space for potential center content */}
          <div className="flex-grow-1 d-none d-lg-block"></div>

          {/* Right side - Icons and profile */}
          <div className="d-flex align-items-center">
            {/* Toggle button - visible only on mobile */}
            

            {/* Notification bell */}
            <a className="bell-icon me-3" href="#">
              <i className="fa-regular fa-bell fs-4"></i>
            </a>

            {/* Profile dropdown */}
            <div className="dropdown">
              <div
                className="fw-bold rounded-4 d-flex align-items-center"
                style={{ cursor: "pointer" }}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="profile-element">
                  <div className="avatar online">
                    <i className="fa-solid user-icon fa-circle-user fs-3"></i>
                  </div>
                </div>
              </div>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/">
                    Update Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/changepassword">
                    Change Password
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/">
                    Logout
                  </Link>
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