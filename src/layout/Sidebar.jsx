import React, { useState } from "react";    
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ collapsed }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null); // Tracks the open submenu
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSubmenu = (menuName) => {
    setOpenSubmenu((prev) => (prev === menuName ? null : menuName));
  };

   // Function to check if a path is active
   const isActive = (path) => {
    return location.pathname === path;
  };

    // Function to check if any of the submenu items are active
    const isSubmenuActive = (paths) => {
      return paths.some((path) => location.pathname.startsWith(path));
    };

  return (
    <div className={`sidebar-container ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar">
        <ul className="menu">
          {/* Dashboard Section */}
          <li className={`menu-item ${isActive("/dashboard") ? "active" : ""}`}>
            <div
              className="menu-link menu-i"
              onClick={() => {navigate("/dashboard"); menuItemClick();} } >
              {/* <i className="fa-solid fa-cubes"></i> */}
              <span className="menu-text">Dashboard</span>
            </div>
          </li>
          <li className={`menu-item ${isActive("/manage") ? "active" : ""}`}>
            <div
              className="menu-link menu-i"
              onClick={() => {navigate("/manage"); menuItemClick();} } >
              {/* <i className="fa-solid fa-cubes"></i> */}
              <span className="menu-text">Manage Customers</span>
            </div>
          </li>
          <li className={`menu-item ${isActive("/requests") ? "active" : ""}`}>
            <div
              className="menu-link menu-i"
              onClick={() => {navigate("/requests"); menuItemClick();} } >
              {/* <i className="fa-solid fa-cubes"></i> */}
              <span className="menu-text">Fund Requests</span>
            </div>
          </li>
          <li className={`menu-item ${isActive("/transactions") ? "active" : ""}`}>
            <div
              className="menu-link menu-i"
              onClick={() => {navigate("/transactions"); menuItemClick();} } >
              {/* <i className="fa-solid fa-cubes"></i> */}
              <span className="menu-text">Transactions Log</span>
            </div>
          </li>
          <li className={`menu-item ${isActive("/notifications") ? "active" : ""}`}>
            <div
              className="menu-link menu-i"
              onClick={() => {navigate("/notifications"); menuItemClick();} } >
              {/* <i className="fa-solid fa-cubes"></i> */}
              <span className="menu-text">Notifications</span>
            </div>
          </li>
          <li className={`menu-item ${isActive("/support") ? "active" : ""}`}>
            <div
              className="menu-link menu-i"
              onClick={() => {navigate("/support"); menuItemClick();} } >
              {/* <i className="fa-solid fa-cubes"></i> */}
              <span className="menu-text">Support / Messages</span>
            </div>
          </li>
          <li className={`menu-item ${isActive("/settings") ? "active" : ""}`}>
            <div
              className="menu-link menu-i"
              onClick={() => {navigate("/settings"); menuItemClick();} } >
              {/* <i className="fa-solid fa-cubes"></i> */}
              <span className="menu-text">Settings</span>
            </div>
          </li>

          

          {/* Vendor Performance Section */}
          {/* <li className={`menu-item ${isActive("/vendorper") ? "active" : ""}`}>
            <div
              className="menu-link menu-i"
              onClick={() => {navigate("/vendorper");menuItemClick();}}>
              <i className="fa-solid fa-file-signature"></i>
              <span className="menu-text">Supplier Performance</span>
            </div>
          </li> */}

          {/* Spend Analytics Section */}
          {/* <li
            className={`menu-item ${isActive("/spendanalyt") ? "active" : ""}`}>
            <div
              className="menu-link menu-i"
              onClick={() => {navigate("/spendanalyt");menuItemClick();}}>
              <i className="fa-solid fa-chart-line"></i>
              <span className="menu-text">Spend Analytics</span>
            </div>
          </li> */}
          {/* Add category and Sub Category */}
          {/* <li className={`menu-item ${isSubmenuActive(["/adddepartment","/addtransaction"]) ? "active" : ""}`}>
            <div
              className="menu-link menu-i"
              onClick={() => toggleSubmenu("addcategory")}>
              <i className="fa-solid fa-arrow-trend-up"></i>
              <span className="menu-text">Add Category/Sub Category</span>
              <i
                className={`fa-solid fa-chevron-down submenu-arrow ${
                  openSubmenu === "addcategory" ? "rotated" : ""
                }`}></i>
            </div>
          </li> */}
          {/* <ul
            className={`submenu ${
              openSubmenu === "addcategory" ? "expanded" : "collapsed"
            }`}>
            <li
              className={`submenu-item ${
                isActive("/adddepartment") ? "active" : ""
              }`}
              onClick={() => {
                navigate("/adddepartment");
                setOpenSubmenu(null);menuItemClick();
              }}>
              <i className="fa-solid fa-arrow-trend-up"></i> Add Department
            </li>
            <li
              className={`submenu-item ${
                isActive("/addtransaction") ? "active" : ""
              }`}
              onClick={() => {
                navigate("/addtransaction");
                setOpenSubmenu(null);menuItemClick();
              }}>
              <i className="fa-solid fa-arrow-trend-up"></i> Add Transaction
            </li>
            </ul> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
