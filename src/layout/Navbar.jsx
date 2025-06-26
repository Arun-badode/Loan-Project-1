import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const navigate = useNavigate(); // ✅ useNavigate at top level

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/"); // ✅ navigate to root
  };

  const handleOpenChangePassword = () => setShowChangePassword(true);
  const handleCloseChangePassword = () => setShowChangePassword(false);

  // Dummy submit handler for modal
  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    // Add your password change logic here
    setShowChangePassword(false);
  };

  return (
    <nav className="navbar navbar-light p-2">
      <div className="container-fluid">
        <div className="d-flex justify-content-between w-100 align-items-center">
          {/* Left side - Brand and company name */}
          <div className="d-flex align-items-center">
            <div className="nav-bran me-3">
              <a className="nav-brand fw-bold" href="#">
                Hi, Jacob Hills
              </a>
              <p className="p-0 m-0 d-none d-md-block">
                Jocob Hills Group Of Company
              </p>
            </div>
            <div
              className="nav-toggle-icon me-3 d-lg-none"
              onClick={toggleSidebar}
            >
              <button className="btn p-0 border-0 bg-transparent">
                <i className="fa fa-bars fs-4" aria-hidden="true"></i>
              </button>
            </div>
          </div>

          {/* Middle - Empty space for potential center content */}
          <div className="flex-grow-1 d-none d-lg-block"></div>

          {/* Right side - Icons and profile */}
          <div className="d-flex align-items-center">
            {/* Notification bell */}
            <a className="bell-icon me-3" href="#">
              <i className="fa-regular fa-bell fs-4"></i>
            </a>

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
                    to="/"
                  >
                    <i className="fas fa-user-pen text-success"></i>
                    Update Profile
                  </Link>
                </li>

                <li className="mb-2">
                  <button
                    className="dropdown-item d-flex align-items-center gap-2 px-3 py-2 rounded-2 text-success border-0"
                    type="button"
                    onClick={handleOpenChangePassword}
                  >
                    <i className="fas fa-lock text-success"></i>
                    Change Password
                  </button>
                </li>

                <li><hr className="dropdown-divider my-2" /></li>

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

      {/* Change Password Modal */}
      {showChangePassword && (
        <div
          className="modal fade show modal-green"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleChangePasswordSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Change Password</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseChangePassword}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Current Password</label>
                    <input type="password" className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input type="password" className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirm New Password</label>
                    <input type="password" className="form-control" required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseChangePassword}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
