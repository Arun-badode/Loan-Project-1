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
import { Modal, Button } from "react-bootstrap";

ChartJS.register(ArcElement, Tooltip, Legend);

const CustomerDashboard = () => {
  const userName = "John Doe";
  const approvedLimit = 10000;

  const [drawRequests, setDrawRequests] = useState([
    { amount: 1000, approved: true, date: "2025-06-15" },
    { amount: 10000, approved: true, date: "2025-07-01" }
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

  const [hasMadeMinimumDraw, setHasMadeMinimumDraw] = useState(totalApproved >= approvedLimit * 0.1);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
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

  return (
    <div className="container p-3 mt-4">
      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Important Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-warning">
            <i className="fas fa-exclamation-circle me-2"></i>
            <strong>Urgent:</strong> Make a minimum 10% first draw within 7 business days to activate your line of credit.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowPopup(false)}>
            Got it
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="mb-4">
        <h2 className="page-heading">Welcome, {userName}</h2>
        <p className="page-subheading">Here's your line of credit summary</p>
      </div>

      <div className="mb-3">
        <h5 className="fw-semibold">Business: {businessName}</h5>
        <p className="text-muted">Account #: {maskedAccount}</p>
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 card-green">
            <div className="card-body">
              <h6 className="text-muted">Approved Limit</h6>
              <h3 className="text-success fw-bold">${approvedLimit.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 card-green">
            <div className="card-body">
              <h6 className="text-muted">Remaining Balance</h6>
              <h3 className="text-success fw-bold">${remainingBalance.toLocaleString()} available</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 card-green">
            <div className="card-body">
              <h6 className="text-muted">Weekly Payment</h6>
              <h3 className="text-success fw-bold">${weeklyPayment.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 card-green">
            <div className="card-body">
              <h6 className="text-muted">Next Payment Date</h6>
              <h5 className="fw-bold text-dark">{nextPaymentDate}</h5>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 card-green">
            <div className="card-body">
              <h6 className="text-muted">Term End Date</h6>
              <h5 className="fw-bold text-dark">{termEndDate}</h5>
              <p className="text-warning small mt-2 mb-0">
                ⚠️ Withdraw all funds before {termEndDate}
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 card-green">
            <div className="card-body">
              <h6 className="text-muted">Factor Rate</h6>
              <h4 className="fw-bold text-dark">{factorRate}x</h4>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 card-green">
            <div className="card-body">
              <h6 className="fw-semibold mb-3">Balance Usage</h6>
              <div style={{ height: "220px" }}>
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="alert alert-success border-success bg-success bg-opacity-10">
            <i className="fas fa-info-circle me-2"></i>
            This is a <strong>draw-down</strong> line of credit, not revolving. You may be eligible for a credit increase once 50% has been paid.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
  