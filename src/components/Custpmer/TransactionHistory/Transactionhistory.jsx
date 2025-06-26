import React from "react";

const Transactionhistory = () => {
  const transactions = [
    {
      id: 1,
      amount: "$5,000.00",
      date: "June 26, 2025",
      status: "Pending",
      reference: "TRX-2025-001",
      description: "Project Funding Phase 1",
      account: "****4587",
    },
    {
      id: 2,
      amount: "$3,200.00",
      date: "June 25, 2025",
      status: "Approved",
      reference: "TRX-2025-002",
      description: "Equipment Purchase",
      account: "****7823",
    },
    {
      id: 3,
      amount: "$7,800.00",
      date: "June 24, 2025",
      status: "Rejected",
      reference: "TRX-2025-003",
      description: "Office Renovation",
      account: "****9354",
    },
    {
      id: 4,
      amount: "$2,500.00",
      date: "June 23, 2025",
      status: "Approved",
      reference: "TRX-2025-004",
      description: "Marketing Campaign",
      account: "****1298",
    },
    {
      id: 5,
      amount: "$4,100.00",
      date: "June 22, 2025",
      status: "Pending",
      reference: "TRX-2025-005",
      description: "Software Licenses",
      account: "****6547",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning-subtle text-warning";
      case "Approved":
        return "bg-success-subtle text-success";
      case "Rejected":
        return "bg-danger-subtle text-danger";
      default:
        return "bg-secondary-subtle text-secondary";
    }
  };

  return (
    <div className="container mt-4 py-4 ">
      <div className="">
        {/* Header */}
             <h2 className="page-heading">Transaction History</h2>
          <p className="page-subheading">All past draw down requests</p>

        {/* Table */}
        <div className="card-green shadow-sm rounded p-3">
          <div className="table-responsive">
            <table className="table align-middle table-hover table-green">
              <thead className="table-light">
                <tr>
                  <th>Reference</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Account</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((txn) => (
                    <tr key={txn.id}>
                      <td>
                        <span className="fw-semibold">{txn.reference}</span>
                      </td>
                      <td>
                        <i className="fas fa-calendar-alt text-secondary me-2" />
                        <span>{txn.date}</span>
                      </td>
                      <td>{txn.description}</td>
                      <td>
                        <i className="fas fa-credit-card text-secondary me-2" />
                        <span>{txn.account}</span>
                      </td>
                      <td>
                        <strong>{txn.amount}</strong>
                      </td>
                      <td>
                        <span
                          className={`badge rounded-pill px-3 py-2 d-inline-flex align-items-center ${getStatusBadge(
                            txn.status
                          )}`}
                        >
                          <i className="fas fa-circle me-2 fs-6"></i>
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-5">
                      <i className="fas fa-receipt text-secondary fs-1 mb-3 d-block" />
                      <p className="text-muted">No transactions found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactionhistory;
