import React, { useEffect, useState } from "react";
import { Modal, Button, Alert, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import LastedTrans from "./LastedTrans";
import Ladyimage from "../../../assets/Ladyimage.png"; // Update with your actual image path1

const CustomerDashboard = () => {

  const [showPopup, setShowPopup] = useState(false);
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [dashboardData, setdashboardData] = useState(null);
  console.log(dashboardData)
  const [creditAmount, setCreditAmount] = useState("");
  const [documentFile, setDocumentFile] = useState(null);

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("login-detail"));
    if (loginData) {
      setUserData(loginData);
      if (loginData.minimumWithdrawl === false) {
        setShowPopup(true);
      }
    }
  }, []);
// ✅ Second useEffect to fetch latest customer data from backend
useEffect(() => {
  const loginData = JSON.parse(localStorage.getItem("login-detail"));
  const customerId = loginData?.id;

  if (customerId) {
    axiosInstance.get(`/custumers?customerId=${customerId}`)
      .then((res) => {
        setdashboardData(res.data.customers[0]);
      })
      .catch((err) => {
        console.error("❌ Error fetching customer data from API:", err);
      });
  }
}, []);
const handleCreditSubmit = async (e) => { 
  e.preventDefault();

  if (!creditAmount || !documentFile) {
    alert("❌ Please provide amount and upload a document.");
    return;
  }

  const formData = new FormData();
  formData.append("customerId", userData?.id);
  formData.append("requestedAmount", creditAmount);
  formData.append("document", documentFile);

  try {
    const response = await axiosInstance.post(
      "/CreditUpgardeRequest",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("✅ Response:", response.data);
    alert("✅ Credit upgrade request submitted successfully!");
    setCreditAmount("");
    setDocumentFile(null);
    setShowCreditModal(false);
  } catch (error) {
    console.error("❌ Error submitting credit upgrade request:", error);
    alert("❌ Failed to submit request. Please try again.");
  }
};

  return (
    <div className="container p-3 mt-4">
      {/* Welcome Section */}
      <div className="mb-4">
        <h2 className="page-heading">Welcome, {userData?.customerName || "Customer"}</h2>
        <p className="page-subheading">Here's your line of credit summary</p>
      </div>


{/* Welcome msg  */}
<div
  className="d-flex justify-content-between align-items-center "
  style={{
    background: "linear-gradient(90deg, #d1f7e8, #e6ffee)",
    borderRadius: "0.75rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    marginBottom: "1rem",
    height: "80px", // ⬅ fixed height to avoid extra vertical space
    overflow: "hidden",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  }}
>
  <p className="mb-0 fw-semibold text-success fs-5" >
    “Ladybugs bring good fortune.”
  </p>

  <img
    src={Ladyimage} // update the path
    alt="Ladybug"
    style={{
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      border: "2px solid #28a745",
      objectFit: "cover",
    }}
  />
</div>





    
    {/* ✅ Credit Increase Alert */}
{userData?.creditIncrease ? (
  <Alert className="mb-4" variant="success">
    <Alert.Heading>
      <i className="fas fa-trophy me-2"></i> Credit Increase Eligible!
    </Alert.Heading>
    <p>
      Congratulations! You may qualify for a credit limit increase. Please submit your most recent business bank statements to be considered.
    </p>
    <div className="text-end">
      <Button variant="success" onClick={() => setShowCreditModal(true)}>
        Apply for Credit Increase
      </Button>
    </div>
  </Alert>
) : (
  <Alert className="mb-4" variant="success">
    <p>
  Pay back 50% of your total credit limit with 100% on-time payments and you may be eligible for a credit increase and rate deduction.
    </p>
  </Alert>
)}


      {/* Cards Section */}
      <div className="row g-4">
        {/* Approved Limit */}
      <div className="col-12 col-md-6 col-lg-4">
  <div className="card shadow-sm border-0 card-green h-100">
    <div className="card-body">
      <h6 className="text-muted">Approved Limit</h6>
      <h3 className="text-success fw-bold">
        ${dashboardData?.approvedAmount || "0.00"}
      </h3>
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
      <h3 className="text-success fw-bold">
        ${dashboardData?.availBalance || "0.00"}
      </h3>
      <div className="mt-2">
        <small className={
            userData?.minimumWithdrawl ? "text-success" : "text-danger"}>
          <i className={`fas fa-${
              userData?.minimumWithdrawl ? "check" : "times"
            }-circle me-1`}></i>
          {userData?.minimumWithdrawl
            ? "Minimum draw met"
            : "Minimum draw pending"}
        </small>
      </div>
    </div>
  </div>
</div>

{/* Term Type */}
<div className="col-12 col-md-6 col-lg-4">
  <div className="card shadow-sm border-0 card-green h-100">
    <div className="card-body">
      <h6 className="text-muted">Term Type</h6>
      <h5 className="fw-bold text-success">
        {dashboardData?.term_type || "N/A"}
      </h5>
    </div>
  </div>
</div>

{/* Weekly Payment */}
<div className="col-12 col-md-6 col-lg-4">
  <div className="card shadow-sm border-0 card-green h-100">
    <div className="card-body">
      <h6 className="text-muted">Payment</h6>
      <h3 className="text-success fw-bold">
        ${dashboardData?.installment || "0.00"}
      </h3>
    </div>
  </div>
</div>

{/* Term Month */}
<div className="col-12 col-md-6 col-lg-4">
  <div className="card shadow-sm border-0 card-green h-100">
    <div className="card-body">
      <h6 className="text-muted"> Remaining Payback</h6>
      <h5 className="fw-bold text-success">
        ${dashboardData?.remainingRepayment || "0.00"}
      </h5>
    </div>
  </div>
</div>

{/* Factor Rate */}
<div className="col-12 col-md-6 col-lg-4">
  <div className="card shadow-sm border-0 card-green h-100">
    <div className="card-body">
      <h6 className="text-muted">Factor Rate</h6>
      <h4 className="fw-bold text-success">
        {dashboardData?.factorRate || "0.00"}
      </h4>
    </div>
  </div>
</div>
<LastedTrans/>
      </div>

         {/* 🔔 Minimum Draw Modal */}
      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered >
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
          <Link to="/requestfund">
            <Button className="btn-green">Request Minimum Draw Now</Button>
          </Link>
        </Modal.Footer>
      </Modal>

      {/* 💳 Credit Increase Modal */}
      <Modal show={showCreditModal} onHide={() => setShowCreditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Request Credit Increase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreditSubmit}>
           <Form.Group className="mb-3">
  <Form.Label>Requested Amount</Form.Label>
  <div className="input-group">
    <span className="input-group-text">$</span>
    <Form.Control
      type="number"
      placeholder="Enter amount"
      value={creditAmount}
      onChange={(e) => setCreditAmount(e.target.value)}
      required
    />
  </div>
</Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>Upload Bank Statement</Form.Label>
              <Form.Control type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setDocumentFile(e.target.files[0])}
                required />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Submit Request
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    </div>
  );
};

export default CustomerDashboard;
