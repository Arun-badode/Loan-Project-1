import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";
import { useState } from "react";
import Login from "./authtication/Login";
import Customerdashboard from "./components/Custpmer/CustomerDashboard/Dashboard";
import DashboardCard from "./components/Admin/Dashboard/DashboardCard";
import Managecustomer from "./components/Admin/ManageCustomer/Managecustomer";
import FundRequest from "./components/Admin/FundRequest/FundRequest";
import TransactionsLog from "./components/Admin/Transactionlog/TransactionsLog";
import NotificationsCard from "./components/Admin/Notification/NotificationCard";
import MessagesUI from "./components/Admin/Message/MessagesUI";
import Requestfund from "./components/Custpmer/RequestFunds/Requestfund";
import Transactionhistory from "./components/Custpmer/TransactionHistory/Transactionhistory";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  const hideLayout = location.pathname === "/"; // Hide sidebar and navbar on login page

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <>
      {/* Show Navbar only if not login page */}
      {!hideLayout && <Navbar toggleSidebar={toggleSidebar} />}

      <div className={`main-content ${hideLayout ? "" : ""}`}>
        {/* Show Sidebar only if not login page */}
        {!hideLayout && (
          <Sidebar
            collapsed={isSidebarCollapsed}
            menuItemClick={() => setIsSidebarCollapsed(true)}
          />
        )}

        {/* Right-side content */}
        <div
          className={`${
            hideLayout ? "" : `right-side-content ${isSidebarCollapsed ? "collapsed" : ""}`
          }`}
        >
          <Routes>
            {/* Login Page */}
            <Route path="/" element={<Login />} />

            {/* Admin Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardCard />} />
            <Route path="/managecustomer" element={<Managecustomer />} />
            <Route path="/fundrequest" element={<FundRequest />} />
            <Route path="/transactionlog" element={<TransactionsLog />} />
            <Route path="/notification" element={<NotificationsCard />} />
            <Route path="/message" element={<MessagesUI />} />

            {/* Customer Dashboard Routes */}
            <Route path="/customer-dashboard" element={<Customerdashboard />} />
            <Route path="/requestfund" element={<Requestfund />} />
            <Route path="/transactionhistory" element={<Transactionhistory />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
