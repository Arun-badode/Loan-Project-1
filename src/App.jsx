import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";
import { useState } from "react";
import Login from "./authtication/Login";
import Customerdashboard from "./components/Custpmer/CustomerDashboard/Dashboard";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const menusidebarcollaps = () => {
    setIsSidebarCollapsed(true);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };
  const location = useLocation();

  const hideLayout = location.pathname === "/";
  return (
    <>
      {/* navbar */}
      {!hideLayout && <Navbar toggleSidebar={toggleSidebar} />}
      {/* navbar end */}
      {/* sidebar start */}
      <div className={`main-content  ${hideLayout ? "" : ""}`}>
        {!hideLayout && (
          <Sidebar
            collapsed={isSidebarCollapsed}
            menuItemClick={menusidebarcollaps}
          />
        )}
        {/* sidebar end */}
        {/* right side  */}
        <div
          className={`right-side-content ${
            isSidebarCollapsed ? "collapsed " : ""
          }`}
        >
          <Routes><Route path="/" element={<Login />} /></Routes>

          {/* AdminDashboard */}

          {/*End-AdminDashboard */}


          {/* ------------------------------------------------------------------------------------------------------ */}


           {/* CustomerDashboard */}
          <Routes><Route path="/customer-dashboard" element={<Customerdashboard />} /></Routes>
           {/* End-CustomerDashboard */}
        </div>
      </div>
    </>
  );
}
export default App;
