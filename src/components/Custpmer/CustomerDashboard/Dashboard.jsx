import React, { useEffect, useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import {Link} from 'react-router-dom'
const CustomerDashboard = () => {
  const approvedLimit = 10000;
  const remainingBalance = 5000;
  const weeklyPayment = 240;
  const nextPaymentDate = "1-7-2025";
  const termEndDate = "15-10-2025";
  const businessName = "Acme Corp";
  const maskedAccount = "XXXXX6789";
  const factorRate = 1.2;
  const totalOwed = 12000;
  const showCreditIncrease = true;

  const [showPopup, setShowPopup] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("login-detail"));
    if (loginData) {
      setUserData(loginData);
      if (loginData.minimumWithdrawl === false) {
        setShowPopup(true);
      }
    }
  }, []);

  return (
    <div className="container p-3 mt-4">
      {/* 🔔 Modal - Minimum Draw Requirement */}
      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered backdrop="static">
        <Modal.Header closeButton className="card-green">
          <Modal.Title>
            <i className="fas fa-exclamation-triangle me-2"></i> Action Required
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="card-green">
          <div className="alert alert-warning">
            <h5 className="fw-bold">Minimum Draw Requirement Not Met</h5>
            <p className="mb-0">
         To keep your credit line active, please withdraw at least 10% of your available credit within the next 7 days.
Based on your current credit limit, your required minimum withdrawal amount is ${userData?.requiredMinimumAmount}.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="card-green">
          <Button variant="secondary" onClick={() => setShowPopup(false)}>
            Remind Me Later
          </Button>
         <Link to="/requestfund"> <Button className="btn-green">
            Request Minimum Draw Now
          </Button></Link>
        </Modal.Footer>
      </Modal>

      {/* Welcome Section */}
      <div className="mb-4">
        <h2 className="page-heading">Welcome, {userData?.customerName || "Customer"}</h2>
        <p className="page-subheading">Here's your line of credit summary</p>
      </div>

      {/* Business Info */}
      <div className="mb-3">
        <h5 className="fw-semibold">Business: {businessName}</h5>
        <p className="text-muted">Account #: {maskedAccount}</p>
      </div>

      {/* Credit Increase Notification */}
      {showCreditIncrease && (
        <Alert className="mb-4" variant="success">
          <Alert.Heading>
            <i className="fas fa-trophy me-2"></i> Credit Increase Eligible!
          </Alert.Heading>
          <p>
            Congratulations! You may qualify for a credit limit increase.
            Please submit your most recent business bank statements to be considered.
          </p>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="row g-4">
        {/* Approved Limit */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 card-green h-100">
            <div className="card-body">
              <h6 className="text-muted">Approved Limit</h6>
              <h3 className="text-success fw-bold">${approvedLimit.toLocaleString()}</h3>
              {userData?.minimumWithdrawl === false && (
                <div className="mt-2">
                  <small className="text-danger">
                    <i className="fas fa-exclamation-circle me-1"></i>
                    Minimum draw required
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Remaining Balance */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 card-green h-100">
            <div className="card-body">
              <h6 className="text-muted">Remaining Balance</h6>
              <h3 className="text-success fw-bold">${remainingBalance.toLocaleString()} available</h3>
              <div className="mt-2">
                <small className={userData?.minimumWithdrawl ? "text-success" : "text-danger"}>
                  <i className={`fas fa-${userData?.minimumWithdrawl ? "check" : "times"}-circle me-1`}></i>
                  {userData?.minimumWithdrawl ? "Minimum draw met" : "Minimum draw pending"}
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Payment */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 card-green h-100">
            <div className="card-body">
              <h6 className="text-muted">Weekly Payment</h6>
              <h3 className="text-success fw-bold">${weeklyPayment.toLocaleString()}</h3>
              <div className="mt-2">
                <small className="text-muted">
                  <i className="fas fa-calendar me-1"></i>
                  Starts {nextPaymentDate}
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Next Payment Date */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 card-green h-100">
            <div className="card-body">
              <h6 className="text-muted">Next Payment Date</h6>
              <h5 className="fw-bold text-dark">{nextPaymentDate}</h5>
              <div className="mt-2">
                <small className="text-muted">
                  <i className="fas fa-money-bill-wave me-1"></i>
                  ${weeklyPayment.toLocaleString()} due
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Term End Date */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 card-green h-100">
            <div className="card-body">
              <h6 className="text-muted">Term End Date</h6>
              <h5 className="fw-bold text-dark">{termEndDate}</h5>
              <p className="text-warning small mt-2 mb-0">
                <i className="fas fa-exclamation-triangle me-1"></i>
                Withdraw all funds before {termEndDate}
              </p>
            </div>
          </div>
        </div>

        {/* Factor Rate */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 card-green h-100">
            <div className="card-body">
              <h6 className="text-muted">Factor Rate</h6>
              <h4 className="fw-bold text-dark">{factorRate}x</h4>
              <div className="mt-2">
                <small className="text-muted">
                  <i className="fas fa-percentage me-1"></i>
                  Total repayment: ${totalOwed.toLocaleString()}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
