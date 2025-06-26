import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ collapsed }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("userRole");

  const toggleSubmenu = (menuName) => {
    setOpenSubmenu((prev) => (prev === menuName ? null : menuName));
  };

  const isActive = (path) => location.pathname === path;

  const menuItemClick = () => {
    console.log("Menu item clicked");
  };

  // Show loading state if role hasn't been retrieved yet

  return (
    <div className={`sidebar-container ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar">
        <ul className="menu">
          {/* Dashboard Section */}
          {role === "Admin" && (
            <>
              <li
                className={`menu-item ${
                  isActive("/dashboard") ? "active" : ""
                }`}
              >
                <div
                  className="menu-link menu-i"
                  onClick={() => {
                    navigate("/dashboard");
                    menuItemClick();
                  }}
                >
                  <span className="menu-text">Dashboard</span>
                </div>
              </li>
              <li
                className={`menu-item ${isActive("/manage") ? "active" : ""}`}
              >
                <div
                  className="menu-link menu-i"
                  onClick={() => {
                    navigate("/manage");
                    menuItemClick();
                  }}
                >
                  <span className="menu-text">Manage Customers</span>
                </div>
              </li>
              <li
                className={`menu-item ${isActive("/requests") ? "active" : ""}`}
              >
                <div
                  className="menu-link menu-i"
                  onClick={() => {
                    navigate("/requests");
                    menuItemClick();
                  }}
                >
                  <span className="menu-text">Fund Requests</span>
                </div>
              </li>
              <li
                className={`menu-item ${
                  isActive("/transactions") ? "active" : ""
                }`}
              >
                <div
                  className="menu-link menu-i"
                  onClick={() => {
                    navigate("/transactions");
                    menuItemClick();
                  }}
                >
                  <span className="menu-text">Transactions Log</span>
                </div>
              </li>
              <li
                className={`menu-item ${
                  isActive("/notifications") ? "active" : ""
                }`}
              >
                <div
                  className="menu-link menu-i"
                  onClick={() => {
                    navigate("/notifications");
                    menuItemClick();
                  }}
                >
                  <span className="menu-text">Notifications</span>
                </div>
              </li>
              <li
                className={`menu-item ${isActive("/support") ? "active" : ""}`}
              >
                <div
                  className="menu-link menu-i"
                  onClick={() => {
                    navigate("/support");
                    menuItemClick();
                  }}
                >
                  <span className="menu-text">Support / Messages</span>
                </div>
              </li>
              <li
                className={`menu-item ${isActive("/settings") ? "active" : ""}`}
              >
                <div
                  className="menu-link menu-i"
                  onClick={() => {
                    navigate("/settings");
                    menuItemClick();
                  }}
                >
                  <span className="menu-text">Settings</span>
                </div>
              </li>
            </>
          )}

          {role === "Customer" && (
            <>
              <li
                className={`menu-item ${isActive("/customer-dashboard") ? "active" : ""}`}
              >
                <div
                  className="menu-link menu-i"
                  onClick={() => {
                    navigate("/customer-dashboard");
                    menuItemClick();
                  }}
                >
                  <span className="menu-text">Dashboard</span>
                </div>
              </li>
              <li
                className={`menu-item ${isActive("/requestfund") ? "active" : ""}`}
              >
                <div
                  className="menu-link menu-i"
                  onClick={() => {
                    navigate("/requestfund");
                    menuItemClick();
                  }}
                >
                  <span className="menu-text">Request Funds</span>
                </div>
              </li>
              <li
                className={`menu-item ${isActive("/transactionhistory") ? "active" : ""}`}
              >
                <div
                  className="menu-link menu-i"
                  onClick={() => {
                    navigate("/transactionhistory");
                    menuItemClick();
                  }}
                >
                  <span className="menu-text">Transaction History</span>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
