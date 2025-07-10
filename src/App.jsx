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
import Requestfund from "./components/Custpmer/RequestFunds/Requestfund";
import Transactionhistory from "./components/Custpmer/TransactionHistory/Transactionhistory";
import Updateprofile from "./components/Profile/Updateprofile";
import Changepassword from "./components/Profile/Changepassword";
import ForgotPassword from "./authtication/ForgotPassword";
import Signup from "./authtication/Signup";
import NotificationsAlerts from "./components/Custpmer/Notification/NotificationsAlerts";
import CreditUpgradeRequests from "./components/Admin/CreditUpgradeRequests/CreditUpgradeRequests";
import ReportsDownload from "./components/Admin/ReportsDownload/ReportsDownload";
import PayoffManagement from "./components/Admin/Message/PayoffManagement";
import FundingBalanceTracker from "./components/Admin/FundingBalanceTracker/FundingBalanceTracker";
import Refer from "./components/Custpmer/refer/Refer";

import EarlyPay from "./components/Custpmer/EarlyPay/EarlyPay";
import CustomerSupport from "./components/Custpmer/CustomerSupport/CustomerSupport";
import ResetPassword from "./authtication/ResetPassword";
import CreditUpgradeCustomer from "./components/Custpmer/CreditUpgradeCustomer/CreditUpgradeCustomer";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Notifications from "./components/Admin/Notifications/Notifications";
import Report from "./components/Custpmer/Report/Report";
import Discount from "./components/Admin/Discount/Discount";
import SupportRequest from "./components/Admin/SupportRequest/SupportRequest";


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
const isNoLayoutPage =
  noLayoutRoutes.includes(location.pathname) ||
  location.pathname.startsWith("/reset-password");

const hideLayout =
  location.pathname === "/" ||
  location.pathname === "/forgotpassword" ||
  location.pathname === "/signup" ||
  location.pathname.startsWith("/reset-password");

  return (
    <>
      {/* navbar */}
      {!hideLayout && <Navbar toggleSidebar={toggleSidebar} />}
      {/* navbar end */}
      {/* sidebar start */}
      <div className={`main-content${hideLayout ? "" : ""}`}>
        {!hideLayout && (
          <Sidebar  collapsed={isSidebarCollapsed}  menuItemClick={menuItemClick}/>
        )}
        {/* sidebar end */}
        {/* right side  */}
        <>
          {isNoLayoutPage ? (
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Routes>
          ) : (
            <div className={`right-side-content${isSidebarCollapsed ? " collapsed" : ""}`}>
              <Routes>
                {/* Protected Admin/User Routes */}
  <Route path="/dashboard" element={<ProtectedRoute><DashboardCard /></ProtectedRoute>} />
  <Route path="/managecustomer" element={<ProtectedRoute><Managecustomer /></ProtectedRoute>} />
  <Route path="/fundrequest" element={<ProtectedRoute><FundRequest /></ProtectedRoute>} />
  <Route path="/balancetracker" element={<ProtectedRoute><FundingBalanceTracker /></ProtectedRoute>} />
  <Route path="/updateprofile" element={<ProtectedRoute><Updateprofile /></ProtectedRoute>} />
  <Route path="/changepassword" element={<ProtectedRoute><Changepassword /></ProtectedRoute>} />
  <Route path="/creditupgraderequests" element={<ProtectedRoute><CreditUpgradeRequests /></ProtectedRoute>} />
  <Route path="/reportdownload" element={<ProtectedRoute><ReportsDownload /></ProtectedRoute>} />
  <Route path="/payoff" element={<ProtectedRoute><PayoffManagement /></ProtectedRoute>} />
  <Route path="/Notification" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
  <Route path="/discount" element={<ProtectedRoute><Discount /></ProtectedRoute>} />
  <Route path="/SupportRequest" element={<ProtectedRoute><SupportRequest /></ProtectedRoute>} />

  {/* Protected Customer Routes */}
  <Route path="/customer-dashboard" element={<ProtectedRoute><Customerdashboard /></ProtectedRoute>} />
  <Route path="/requestfund" element={<ProtectedRoute><Requestfund /></ProtectedRoute>} />
  <Route path="/transactionhistory" element={<ProtectedRoute><Transactionhistory /></ProtectedRoute>} />
  <Route path="/EarlyPay" element={<ProtectedRoute><EarlyPay /></ProtectedRoute>} />
  <Route path="/notificationalert" element={<ProtectedRoute><NotificationsAlerts /></ProtectedRoute>} />
  <Route path="/refer" element={<ProtectedRoute><Refer /></ProtectedRoute>} />
  <Route path="/CustomerSupport" element={<ProtectedRoute><CustomerSupport /></ProtectedRoute>} />
  <Route path="/CreditUpgradeCustomer" element={<ProtectedRoute><CreditUpgradeCustomer /></ProtectedRoute>} />
  <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>} />
              </Routes>
            </div>
          )}
        </>
      </div>
    </>
  );
}
export default App;