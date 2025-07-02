import React, { useState } from "react";
import DashboardViewModal from "./DashboardViewModal";

const requests = [
  {
    id: "REQ-2025-06-26-001",
    customer: "Acme Corp",
    amount: "$250,000",
    date: "2025-06-26",
    status: "Pending",
    factorRate: 1.12,
  },
  {
    id: "REQ-2025-06-25-003",
    customer: "TechSolutions Inc",
    amount: "$500,000",
    date: "2025-06-25",
    status: "Approved",
    factorRate: 1.08,
  },
  {
    id: "REQ-2025-06-25-002",
    customer: "Global Traders Ltd",
    amount: "$750,000",
    date: "2025-06-25",
    status: "Overdue",
    factorRate: 1.15,
  },
  {
    id: "REQ-2025-06-24-005",
    customer: "Innovate Partners",
    amount: "$300,000",
    date: "2025-06-24",
    status: "Approved",
    factorRate: 1.10,
  },
  {
    id: "REQ-2025-06-23-008",
    customer: "Sunrise Enterprises",
    amount: "$425,000",
    date: "2025-06-23",
    status: "Pending",
    factorRate: 1.09,
  },
  {
    id: "REQ-2025-06-22-010",
    customer: "Oceanic Shipping",
    amount: "$600,000",
    date: "2025-06-22",
    status: "Overdue",
    factorRate: 1.18,
  },
  {
    id: "REQ-2025-06-21-015",
    customer: "Mountain View Tech",
    amount: "$350,000",
    date: "2025-06-21",
    status: "Overdue",
    factorRate: 1.14,
  },
];

const statusBadge = (status) => {
  const baseClasses = "px-2 py-1 rounded-pill fw-medium";
  switch (status) {
    case "Approved":
      return <span className={`badge-success-soft ${baseClasses}`}>Approved</span>;
    case "Pending":
      return <span className={`badge-warning-soft ${baseClasses}`}>Pending</span>;
    case "Overdue":
      return <span className={`badge-danger-soft ${baseClasses}`}>Overdue</span>;
    default:
      return <span className={`badge-warning-soft ${baseClasses}`}>Unknown</span>;
  }
};

const DashboardTable = ({ filter }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleView = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  // Filter requests based on the active filter
  const filteredRequests = filter 
    ? requests.filter(request => {
        if (filter === 'all') return true;
        if (filter === 'pending') return request.status === 'Pending';
        if (filter === 'overdue') return request.status === 'Overdue';
        return true;
      })
    : requests;

  return (
    <div className="card border-0 shadow-sm rounded-4 p-3 card-green">
      <div className="d-flex justify-content-between align-items-center px-2 pb-2">
        <h5 className="fw-semibold mb-0">Latest Funding Requests</h5>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle table-green">
          <thead>
            <tr className="text-muted small">
              <th>Request ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Factor Rate</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.customer}</td>
                <td className="fw-bold">{item.amount}</td>
                <td>{item.factorRate}</td>
                <td>{item.date}</td>
                <td>{statusBadge(item.status)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-link text-success me-2"
                    onClick={() => handleView(item)}
                    title="View"
                  >
                    <i className="fas fa-eye me-1"></i>
                  </button>
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

      {/* Modal */}
      {selectedRequest && (
        <DashboardViewModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          request={selectedRequest}
        />
      )}

      {/* Footer */}
      <div className="d-flex justify-content-between align-items-center px-2 pt-2 small text-muted">
        <span>Showing {filteredRequests.length} of {requests.length} requests</span>
        <div>
          <button className="btn btn-outline-success btn-sm me-2">Previous</button>
          <button className="btn btn-outline-success btn-sm">Next</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;