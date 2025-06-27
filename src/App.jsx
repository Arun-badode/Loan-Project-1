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
import Requestfund from "./components/Custpmer/RequestFunds/Requestfund";
import Transactionhistory from "./components/Custpmer/TransactionHistory/Transactionhistory";
import Updateprofile from "./components/Profile/Updateprofile";
import Changepassword from "./components/Profile/Changepassword";
import ForgotPassword from "./authtication/ForgotPassword";
import Signup from "./authtication/Signup";
import EarlyPayoffDiscount from "./components/Custpmer/Discount/EarlyPayoffDiscount";
import NotificationsAlerts from "./components/Custpmer/Notification/NotificationsAlerts";
import PaymentTracking from "./components/Admin/PaymentTracker/Paymenttracking";
import CreditUpgradeRequests from "./components/Admin/CreditUpgradeRequests/CreditUpgradeRequests";
import ReportsDownload from "./components/Admin/ReportsDownload/ReportsDownload";
import PayoffManagement from "./components/Admin/Message/PayoffManagement";


function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const menusidebarcollaps = () => {
    setIsSidebarCollapsed(true);
  };

  const menuItemClick = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };
  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };
  const location = useLocation();
  // Inside component
  const noLayoutRoutes = ["/", "/signup", "/forgotpassword"];
  const isNoLayoutPage = noLayoutRoutes.includes(location.pathname);
  // Hide layout (navbar/sidebar) only on login page
  const hideLayout = location.pathname === "/" || location.pathname === "/forgotpassword" || location.pathname === "/signup";
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
            menuItemClick={menuItemClick}
          />
        )}
        {/* sidebar end */}
        {/* right side  */}
        <>
          {isNoLayoutPage ? (
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
            </Routes>
          ) : (
            <div className={`right-side-content ${isSidebarCollapsed ? "collapsed" : ""}`}>
              <Routes>
                {/* AdminDashboard */}
                <Route path="/dashboard" element={<DashboardCard />} />
                <Route path="/managecustomer" element={<Managecustomer />} />
                <Route path="/fundrequest" element={<FundRequest />} />
                <Route path="/transactionlog" element={<TransactionsLog />} />
                {/* <Route path="/notification" element={<NotificationsCard />} /> */}
                <Route path="/updateprofile" element={<Updateprofile />} />
                <Route path="/changepassword" element={<Changepassword />} />
                <Route path="/paymenttracking" element={<PaymentTracking />} />
                <Route path="/creditupgraderequests" element={<CreditUpgradeRequests />} />
                <Route path="/reportdownload" element={<ReportsDownload />} />
                <Route path="/payoff" element={<PayoffManagement />} />
                {/* <Route path="/message" element={<MessagesUI />} /> */}

                {/* CustomerDashboard */}
                <Route path="/customer-dashboard" element={<Customerdashboard />} />
                <Route path="/requestfund" element={<Requestfund />} />
                <Route path="/transactionhistory" element={<Transactionhistory />} />
                <Route path="/discount" element={<EarlyPayoffDiscount />} />
                <Route path="/notificationalert" element={<NotificationsAlerts />} />
              </Routes>
            </div>
          )}
        </>
      </div>
    </>
  );
}
export default App;
