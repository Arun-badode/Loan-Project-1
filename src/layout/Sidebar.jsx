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
    { path: "/managecustomer", icon: "fa-users", text: "Customer Management" },
    { path: "/fundrequest", icon: "fa-hand-holding-usd", text: "Fund Requests" },
    { path: "/discount", icon: "fa-percentage", text: "Discount" },
    { path: "/payoff", icon: "fa-comments-dollar", text: "Payoff Management" },
    { path: "/creditupgraderequests", icon: "fa-arrow-up", text: "Credit Upgrade Requests" },
    { path: "/balancetracker", icon: "fa-receipt", text: "Funding Balance Tracker" },
    { path: "/reportdownload", icon: "fa-file-download", text: "Reports & Download" },
    { path: "/Notification", icon: "fa-bell", text: "Notification" },
    { path: "/SupportRequest", icon: "fa-headset", text: "Support Request" },

  ];

  const customerMenuItems = [
    { path: "/customer-dashboard", icon: "fa-home", text: "Dashboard" },
    { path: "/requestfund", icon: "fa-wallet", text: "Request Funds" },
    { path: "/transactionhistory", icon: "fa-history", text: "History" },
    { path: "/EarlyPay", icon: "fa-wallet", text: "Early Pay" },
    { path: "/notificationalert", icon: "fa-bell", text: "Notifications" },
    { path: "/CustomerSupport", icon: "fa-headset", text: "Customer Support" },
    { path: "/CreditUpgradeCustomer", icon: "fa-chart-line", text: "Credit Upgrade" },
    { path: "/report", icon: "fa-file-download", text: "Reports" },
   { path: "/refer", icon: "fa-user-plus", text: "Refer a Friend" }
  ];

  return (
    <div className={`sidebar-container ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar">
        <ul className="menu">
          {(role === "admin" ? adminMenuItems : customerMenuItems).map((item) => (
            <li
              key={item.path}
              className={`menu-item ${isActive(item.path) ? "active" : ""}`}
              style={{ width: "100%" }}
            >
              <div
                className="menu-link d-flex align-items-center"
                style={{
                  padding: "10px 12px",
                  cursor: "pointer",
                  justifyContent: collapsed ? "center" : "flex-start",
                  width: "100%",
                }}
                onClick={() => handleNavigation(item.path)}>
                <i
                  className={`fas ${item.icon}`}
                  style={{
                    fontSize: "1.2rem",
                    minWidth: "24px",
                    textAlign: "center",
                    color: isActive(item.path) ? "white" : "#222",}}></i>
                {!collapsed && (
                  <span className="menu-text ms-2" style={{ fontSize: "1rem" }}>
                    {item.text.replace("_", " ")}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;