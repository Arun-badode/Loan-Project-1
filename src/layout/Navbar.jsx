import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("userName") || "User";
    setUserName(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const handleOpenChangePassword = () => setShowChangePassword(true);
  const handleCloseChangePassword = () => setShowChangePassword(false);

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    setShowChangePassword(false);
  };

  return (
    <nav className="navbar navbar-light p-2">
      <div className="container-fluid">
        <div className="d-flex justify-content-between w-100 align-items-center">
          {/* Left side */}
          <div className="d-flex align-items-center">
            <div className="nav-bran me-3">
              <a className="nav-brand fw-bold" href="#">
                Hi, {userName}
              </a>
              <p className="p-0 m-0 d-none d-md-block">
                {userName} Group Of Company
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
                <i className="fa-regular fa-bell fs-4 text-success"></i>
              </button>

              {/* Notification Card */}
              {showNotification && (
                <div
                  className="position-absolute end-0 mt-2 shadow-sm rounded-3 border border-success bg-white"
                  style={{
                    width: "280px",
                    zIndex: 1000,
                    right: 0,
                  }}
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
                    {/* Notification Item 1 */}
                    <div className="d-flex align-items-start gap-2 mb-3">
                      <i className="fas fa-bell mt-1 text-success"></i>
                      <div className="small text-dark">
                        <div className="fw-semibold">
                          3 new transaction alerts
                        </div>
                        <div className="text-muted small">Just now</div>
                      </div>
                    </div>

                    {/* Notification Item 2 */}
                    <div className="d-flex align-items-start gap-2 mb-3">
                      <i className="fas fa-check-circle mt-1 text-success"></i>
                      <div className="small text-dark">
                        <div className="fw-semibold">Withdrawal approved</div>
                        <div className="text-muted small">15 minutes ago</div>
                      </div>
                    </div>

                    {/* Notification Item 3 */}
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
