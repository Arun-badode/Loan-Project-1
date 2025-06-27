import React from "react";


import DashboardViewModal from "./DashboardViewModal";
import Button from 'react-bootstrap/Button';

const requests = [
  {
    id: "REQ-2025-06-26-001",
    customer: "Acme Corp",
    amount: "$250,000",
    date: "2025-06-26",
    status: "Pending",
  },
  {
    id: "REQ-2025-06-25-003",
    customer: "TechSolutions Inc",
    amount: "$500,000",
    date: "2025-06-25",
    status: "Approved",
  },
  {
    id: "REQ-2025-06-25-002",
    customer: "Global Traders Ltd",
    amount: "$750,000",
    date: "2025-06-25",
    status: "Rejected",
  },
  {
    id: "REQ-2025-06-24-005",
    customer: "Innovate Partners",
    amount: "$300,000",
    date: "2025-06-24",
    status: "Approved",
  },
  {
    id: "REQ-2025-06-23-008",
    customer: "Sunrise Enterprises",
    amount: "$425,000",
    date: "2025-06-23",
    status: "Pending",
  },
];

const statusBadge = (status) => {
  const baseClasses = "px-2 py-1 rounded-pill fw-medium";

  switch (status) {
    case "Approved":
      return <span className={`badge-success-soft ${baseClasses} badge-status-approved`}>Approved</span>;
    case "Pending":
      return <span className={`badge-warning-soft ${baseClasses} badge-status-pending`}>Pending</span>;
    case "Rejected":
      return <span className={`badge-danger-soft ${baseClasses} badge-status-rejected`}>Rejected</span>;
    default:
      return <span className={`badge-warning-soft ${baseClasses} badge-status-unknown`}>Unknown</span>;
  }
};


const DashboardTable = () => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div className="card border-0 shadow-sm rounded-4 p-3 card-green">
      <div className="d-flex justify-content-between align-items-center px-2 pb-2 ">
        <h5 className="fw-semibold mb-0">Latest Funding Requests</h5>
        {/* <a href="#view-all" className="text-danger text-decoration-none fw-semibold">
          View All
        </a> */}
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle table-green">
          <thead>
            <tr className="text-muted small">
              <th>Request ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((item, index) => (
              <tr key={index}>
                <td className="">{item.id}</td>
                <td>{item.customer}</td>
                <td className="fw-bold">{item.amount}</td>
                <td>{item.date}</td>
                <td>{statusBadge(item.status)}</td>
                <td>
                  {/* <button className="btn btn-sm btn-link text-Success me-2" title="View">
                    <i className="fas fa-eye"></i>
                  </button> */}


                  <button
                    className="btn btn-sm btn-link text-success me-2"
                    onClick={() => setShowModal(true)}
                  >
                    <i className="fas fa-eye me-1"></i> 
                  </button>

                  <DashboardViewModal
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                  />
                  <button className="btn btn-sm btn-link text-success me-2" title="Approve">
                    <i className="fas fa-check"></i>
                  </button>
                  <button className="btn btn-sm btn-link text-danger" title="Reject">
                    <i className="fas fa-times"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="d-flex justify-content-between align-items-center px-2 pt-2 small text-muted">
        <span>Showing 5 of 25 requests</span>
        <div>
          <button className="btn btn-outline-success btn-sm me-2">Previous</button>
          <button className="btn btn-outline-success btn-sm">Next</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;
