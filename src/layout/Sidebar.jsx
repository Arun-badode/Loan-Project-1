import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ collapsed,menuItemClick}) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("userRole");

  const toggleSubmenu = (menuName) => {
    setOpenSubmenu((prev) => (prev === menuName ? null : menuName));
  };

  const isActive = (path) => location.pathname === path;

  

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
                  onClick={() => {navigate("/dashboard");  menuItemClick();}}
                >
                  <i className="fas fa-tachometer-alt me-2 "></i>
                  <span className="menu-text">Dashboard</span>
                </div>
              </li>

              <li
                className={`menu-item ${
                  isActive("/managecustomer") ? "active" : ""
                }`}
              >
                <div
                  className="menu-link menu-i"
                  onClick={() => {navigate("/managecustomer"); menuItemClick();}}
                >
                  <i className="fas fa-users me-2 "></i>
                  <span className="menu-text">Manage_Customers</span>
                </div>
              </li>

              <li
                className={`menu-item ${
                  isActive("/fundrequest") ? "active" : ""
                }`}
              >
                <div
                  className="menu-link menu-i"
                  onClick={() => {navigate("/fundrequest");menuItemClick();}}
                >
                  <i className="fas fa-hand-holding-usd me-2 "></i>
                  <span className="menu-text">Fund_Requests</span>
                </div>
              </li>

              <li
                className={`menu-item ${
                  isActive("/transactionlog") ? "active" : ""
                }`}
              >
                <div
                  className="menu-link menu-i"
                  onClick={() => {navigate("/transactionlog");menuItemClick();}}
                >
                  <i className="fas fa-receipt me-2 "></i>
                  <span className="menu-text">Funding Balance Tracker</span>
                </div>
              </li>

              <li
                className={`menu-item ${
                  isActive("/paymenttracking") ? "active" : ""
                }`}
              >
                <div
                  className="menu-link menu-i"
                  onClick={() => {navigate("/paymenttracking"); menuItemClick();}}
                >
                  <i className="fas fa-bell me-2 "></i>
                  <span className="menu-text">Payment Tracking</span>
                </div>
              </li>

              <li
                className={`menu-item ${isActive("/payoff") ? "active" : ""}`}
              >
                <div
                  className="menu-link menu-i"
                  onClick={() => {navigate("/payoff"); menuItemClick();}}
                >
                  <i className="fas fa-comments me-2 "></i>
                  <span className="menu-text">Payoff Management</span>
                </div>
              </li>
                <li
                className={`menu-item ${isActive("/creditrequest") ? "active" : ""}`}
              >
                <div
                  className="menu-link menu-i"
                  onClick={() => {navigate("/creditrequest"); menuItemClick();}}
                >
                  <i className="fas fa-comments me-2 "></i>
                  <span className="menu-text">Credit Upgrade Requests</span>
                </div>
              </li>
                <li
                className={`menu-item ${isActive("/reportdownload") ? "active" : ""}`}
              >
                <div
                  className="menu-link menu-i"
                  onClick={() => {navigate("/reportdownload"); menuItemClick();}}
                >
                  <i className="fas fa-comments me-2 "></i>
                  <span className="menu-text">. Reports & Download</span>
                </div>
              </li>
            </>
          )}

          {role === "Customer" && (
            <>
              <li
                className={`menu-item ${
                  isActive("/customer-dashboard") ? "active" : ""
                }`}
              >
                <div
                  className="menu-link menu-i"
                  onClick={() => {navigate("/customer-dashboard"); menuItemClick();}}
                >
                  <i className="fas fa-home me-2"></i>
                  <span className="menu-text">Dashboard</span>
                </div>
              </li>

              <li
                className={`menu-item ${
                  isActive("/requestfund") ? "active" : ""
                }`}
              >
                <div
                  className="menu-link menu-i"
                  onClick={() => {navigate("/requestfund"); menuItemClick();}}
                >
                  <i className="fas fa-wallet me-2 "></i>
                  <span className="menu-text">Request_Funds</span>
                </div>
              </li>

              <li
                className={`menu-item ${
                  isActive("/transactionhistory") ? "active" : ""
                }`}
              >
                <div
                  className="menu-link menu-i"
                  onClick={() => {navigate("/transactionhistory"); menuItemClick();}}
                >
                  <i className="fas fa-history me-2"></i>
                  <span className="menu-text">History</span>
                </div>
              </li>
              <li
                className={`menu-item ${
                  isActive("/discount") ? "active" : ""
                }`}
              >
                <div
                  className="menu-link menu-i"
                  onClick={() => {navigate("/discount"); menuItemClick();}}
                >
                  <i className="fas fa-history me-2"></i>
                  <span className="menu-text">Discount</span>
                </div>
              </li>
              <li
                className={`menu-item ${
                  isActive("/notificationalert") ? "active" : ""
                }`}
              >
                <div
                  className="menu-link menu-i"
                  onClick={() => {navigate("/notificationalert"); menuItemClick();}}
                >
                  <i className="fas fa-history me-2"></i>
                  <span className="menu-text">Notifications</span>
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
