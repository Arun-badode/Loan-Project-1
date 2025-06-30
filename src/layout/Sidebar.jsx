import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ collapsed, menuItemClick }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("userRole");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSubmenu = (menuName) => {
    setOpenSubmenu((prev) => (prev === menuName ? null : menuName));
  };

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      menuItemClick(); // Close sidebar automatically on mobile after navigation
    }
  };

  // Menu items configuration
  const adminMenuItems = [
    { path: "/dashboard", icon: "fa-tachometer-alt", text: "Dashboard" },
    { path: "/managecustomer", icon: "fa-users", text: "Manage Customers" },
    { path: "/fundrequest", icon: "fa-hand-holding-usd", text: "Fund Requests" },
    { path: "/balancetracker", icon: "fa-receipt", text: "Funding Balance Tracker" },
    { path: "/paymenttracking", icon: "fa-bell", text: "Payment Tracking" },
    { path: "/payoff", icon: "fa-comments-dollar", text: "Payoff Management" },
    { path: "/createrequest", icon: "fa-arrow-up", text: "Credit Upgrade Requests" },
    { path: "/reportdownload", icon: "fa-file-download", text: "Reports & Download" }
  ];

  const customerMenuItems = [
    { path: "/customer-dashboard", icon: "fa-home", text: "Dashboard" },
    { path: "/requestfund", icon: "fa-wallet", text: "Request Funds" },
    { path: "/transactionhistory", icon: "fa-history", text: "History" },
    { path: "/discount", icon: "fa-percentage", text: "Discount" },
    { path: "/notificationalert", icon: "fa-bell", text: "Notifications" }
  ];

  return (
    <div className={`sidebar-container ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar">
        <ul className="menu">
          {(role === "Admin" ? adminMenuItems : customerMenuItems).map((item) => (
            <li
              key={item.path}
              className={`menu-item ${isActive(item.path) ? "active" : ""}`}
            >
              <div
                className="menu-link menu-i"
                onClick={() => handleNavigation(item.path)}
              >
                <i className={`fas ${item.icon} me-2`}></i>
                <span className="menu-text">{item.text}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;