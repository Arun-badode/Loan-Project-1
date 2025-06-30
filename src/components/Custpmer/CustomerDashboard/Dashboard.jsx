// import React from "react";
// import { Doughnut } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const CustomerDashboard = () => {
//   const userName = "John Doe";
//   const approvedLimit = 10000;
//   const remainingBalance = 5000;
//   const usedBalance = approvedLimit - remainingBalance;
//   const weeklyPayment = 200;
//   const nextPaymentDate = "2025-07-01";
//   const termEndDate = "2025-08-15";
//   const factorRate = 1.2;

//   const doughnutData = {
//     labels: ["Used Balance", "Remaining Balance"],
//     datasets: [
//       {
//         data: [usedBalance, remainingBalance],
//         backgroundColor: ["#28a745", "#A0D468"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const doughnutOptions = {
//     cutout: "70%",
//     plugins: {
//       legend: {
//         position: "bottom",
//       },
//     },
//     maintainAspectRatio: false,
//   };

//   return (
//     <div className="container p-3 mt-4">
//       {/* Welcome Message */}
//       <div className="mb-4">
//         <h2 className="page-heading">Welcome, {userName}</h2>
//         <p className="page-subheading">Here's your line of credit summary</p>
//       </div>

//       <div className="row g-4">
//         <div className="col-12 col-md-6 col-lg-4">
//           <div className="card shadow-sm border-0 card-green">
//             <div className="card-body">
//               <h6 className="text-muted">Approved Limit</h6>
//               <h3 className="text-success fw-bold">${approvedLimit.toLocaleString()}</h3>
//             </div>
//           </div>
//         </div>

//         <div className="col-12 col-md-6 col-lg-4">
//           <div className="card shadow-sm border-0 card-green">
//             <div className="card-body">
//               <h6 className="text-muted">Remaining Balance</h6>
//               <h3 className="text-success fw-bold">${remainingBalance.toLocaleString()} available</h3>
//             </div>
//           </div>
//         </div>

//         <div className="col-12 col-md-6 col-lg-4">
//           <div className="card shadow-sm border-0 card-green">
//             <div className="card-body">
//               <h6 className="text-muted">Weekly Payment</h6>
//               <h3 className="text-success fw-bold">${weeklyPayment.toLocaleString()}</h3>
//             </div>
//           </div>
//         </div>

//         <div className="col-12 col-md-6 col-lg-4">
//           <div className="card shadow-sm border-0 card-green">
//             <div className="card-body">
//               <h6 className="text-muted">Next Payment Date</h6>
//               <h5 className="fw-bold text-dark">{nextPaymentDate}</h5>
//             </div>
//           </div>
//         </div>

//         <div className="col-12 col-md-6 col-lg-4">
//           <div className="card shadow-sm border-0 card-green">
//             <div className="card-body">
//               <h6 className="text-muted">Term End Date</h6>
//               <h5 className="fw-bold text-dark">{termEndDate}</h5>
//               <p className="text-warning small mt-2 mb-0">
//                 ⚠️ Withdraw all funds before {termEndDate}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="col-12 col-md-6 col-lg-4">
//           <div className="card shadow-sm border-0 card-green">
//             <div className="card-body">
//               <h6 className="text-muted">Factor Rate</h6>
//               <h4 className="fw-bold text-dark">{factorRate}x</h4>
//             </div>
//           </div>
//         </div>

//         {/* Doughnut Chart Section */}
//         <div className="col-12 col-md-6 col-lg-4">
//           <div className="card shadow-sm border-0 card-green">
//             <div className="card-body">
//               <h6 className="fw-semibold mb-3">Balance Usage</h6>
//               <div style={{ height: "220px" }}>
//                 <Doughnut data={doughnutData} options={doughnutOptions} />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Note Section */}
//         <div className="col-12">
//           <div className="alert alert-success border-success bg-success bg-opacity-10">
//             <i className="fas fa-info-circle me-2"></i>
//             This is a <strong>draw-down</strong> line of credit, not revolving.
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDashboard;








import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Modal, Button, Alert } from "react-bootstrap";

ChartJS.register(ArcElement, Tooltip, Legend);

const CustomerDashboard = () => {
  const userName = "John Doe";
  const approvedLimit = 10000;

  // Start with no approved requests to demonstrate the popup
  const [drawRequests, setDrawRequests] = useState([
    { amount: 500, approved: false, date: "2025-06-15" } // Changed to false and reduced amount
  ]);

  const totalApproved = drawRequests.filter(r => r.approved).reduce((sum, r) => sum + r.amount, 0);
  const remainingBalance = approvedLimit - totalApproved;
  const usedBalance = totalApproved;

  const factorRate = 1.2;
  const remainingWeeks = 10;
  const totalOwed = drawRequests.filter(r => r.approved).reduce((sum, r) => sum + r.amount * factorRate, 0);
  const weeklyPayment = Math.round(totalOwed / remainingWeeks);

  const nextPaymentDate = "2025-07-01";
  const termEndDate = "2025-08-15";

  const businessName = "Acme Corp";
  const accountNumber = "123456789";
  const maskedAccount = "XXXXX" + accountNumber.slice(-4);

  const [showPopup, setShowPopup] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(5000);
  const [showCreditIncrease, setShowCreditIncrease] = useState(
    approvedLimit - currentBalance >= approvedLimit * 0.5
  );

  // Calculate minimum draw requirement (10% of approved limit)
  const minimumDrawAmount = approvedLimit * 0.1;
  const hasMadeMinimumDraw = totalApproved >= minimumDrawAmount;

  useEffect(() => {
    // Show popup only if minimum draw hasn't been made
    if (!hasMadeMinimumDraw) {
      setShowPopup(true);
    }
  }, [hasMadeMinimumDraw]);

  const doughnutData = {
    labels: ["Used Balance", "Remaining Balance"],
    datasets: [
      {
        data: [usedBalance, remainingBalance],
        backgroundColor: ["#28a745", "#A0D468"],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    maintainAspectRatio: false,
  };

  // Function to simulate approving the minimum draw
  const approveMinimumDraw = () => {
    setDrawRequests([
      { amount: minimumDrawAmount, approved: true, date: new Date().toLocaleDateString() }
    ]);
    setShowPopup(false);
  };

  return (
    <div className="container p-3 mt-4">
      {/* Minimum Draw Requirement Modal */}
      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered backdrop="static">
        <Modal.Header closeButton className="bg-warning">
          <Modal.Title>
            <i className="fas fa-exclamation-triangle me-2"></i>
            Action Required
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-warning">
            <h5 className="fw-bold">Minimum Draw Requirement Not Met</h5>
            
            <p className="mb-0">
             "Urgent, make a minimum 10% first draw within 7 business days to activate your line of credit."
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPopup(false)}>
            Remind Me Later
          </Button>
          <Button variant="primary" onClick={approveMinimumDraw}>
            Request Minimum Draw Now
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Welcome Section */}
      <div className="mb-4">
        <h2 className="page-heading">Welcome, {userName}</h2>
        <p className="page-subheading">Here's your line of credit summary</p>
      </div>

      {/* Business Info */}
      <div className="mb-3">
        <h5 className="fw-semibold">Business: {businessName}</h5>
        <p className="text-muted">Account #: {maskedAccount}</p>
      </div>

      {/* Credit Increase Notification */}
      {showCreditIncrease && (
        <Alert  className="mb-4  "
        variant="success">
          <Alert.Heading>
            <i className="fas fa-trophy me-2 "></i>
            Credit Increase Eligible!
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
              {!hasMadeMinimumDraw && (
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
                <small className={hasMadeMinimumDraw ? "text-success" : "text-danger"}>
                  <i className={`fas fa-${hasMadeMinimumDraw ? "check" : "times"}-circle me-1`}></i>
                  {hasMadeMinimumDraw ? "Minimum draw met" : "Minimum draw pending"}
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
              {weeklyPayment > 0 && (
                <div className="mt-2">
                  <small className="text-muted">
                    <i className="fas fa-calendar me-1"></i>
                    Starts {nextPaymentDate}
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Next Payment Date */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 card-green h-100">
            <div className="card-body">
              <h6 className="text-muted">Next Payment Date</h6>
              <h5 className="fw-bold text-dark">{nextPaymentDate}</h5>
              {weeklyPayment > 0 && (
                <div className="mt-2">
                  <small className="text-muted">
                    <i className="fas fa-money-bill-wave me-1"></i>
                    ${weeklyPayment.toLocaleString()} due
                  </small>
                </div>
              )}
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

        {/* Doughnut Chart */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 card-green h-100">
            <div className="card-body">
              <h6 className="fw-semibold mb-3">Balance Usage</h6>
              <div style={{ height: "220px" }}>
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
              <div className="text-center mt-2">
                <small className="text-muted">
                  {usedBalance > 0 ? `${((usedBalance/approvedLimit)*100).toFixed(1)}% utilized` : "No draws yet"}
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Information Alert */}
        <div className="col-12">
          <Alert variant="success" className="mt-4">
            <Alert.Heading>
              <i className="fas fa-info-circle me-2"></i>
              Important Information
            </Alert.Heading>
            <p>
              This is a <strong>draw-down</strong> line of credit, not revolving. Approval is handled by our underwriting team.
              For credit increase requests (after 50% repayment), please submit updated business documents.
            </p>
            {!hasMadeMinimumDraw && (
              <div className="mt-2">
                <Button variant="warning" size="sm" onClick={() => setShowPopup(true)}>
                  <i className="fas fa-exclamation-triangle me-1"></i>
                  Complete Minimum Draw Requirement
                </Button>
              </div>
            )}
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
