import React, { useState } from "react";

const CreditUpgradeRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      customer: "John Doe",
      repaymentPercent: 55,
      requestedAmount: 20000,
      status: "Pending",
    },
    {
      id: 2,
      customer: "Jane Smith",
      repaymentPercent: 60,
      requestedAmount: 15000,
      status: "Pending",
    },
    {
      id: 3,
      customer: "Alice Johnson",
      repaymentPercent: 52,
      requestedAmount: 25000,
      status: "Approved",
    },
  ]);

  const handleRequestDocs = (id) => {
    alert(`Requested additional documents from customer ID: ${id}`);
  };

  const handleApprove = (id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Approved" } : r))
    );
  };

  const handleDecline = (id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Declined" } : r))
    );
  };

  return (
    <div className="container mt-3 p-3">
      <h2 className="page-heading">Credit Upgrade Requests</h2>
      <p className="page-subheading">
        Review auto-generated upgrade requests for customers who reached 50% repayment.
      </p>

      <div className="card card-green shadow-sm border-0">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-3">Pending Credit Requests</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-success">
                <tr>
                  <th>Customer</th>
                  <th>Repayment %</th>
                  <th>Requested Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id}>
                    <td>{req.customer}</td>
                    <td>{req.repaymentPercent}%</td>
                    <td className="fw-bold text-success">${req.requestedAmount.toLocaleString()}</td>
                    <td>
                      <span
                        className={`badge rounded-pill px-3 py-2 fw-semibold text-uppercase ${
                          req.status === "Approved"
                            ? "bg-success text-white"
                            : req.status === "Declined"
                            ? "bg-danger text-white"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td>
                      {req.status === "Pending" ? (
                        <>
                          <button
                            className="btn btn-sm btn-outline-secondary me-2"
                            onClick={() => handleRequestDocs(req.id)}
                          >
                            Request Docs
                          </button>
                          <button
                            className="btn btn-sm btn-success me-2"
                            onClick={() => handleApprove(req.id)}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDecline(req.id)}
                          >
                            Decline
                          </button>
                        </>
                      ) : (
                        <span className="text-muted small">No further action</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditUpgradeRequests;
