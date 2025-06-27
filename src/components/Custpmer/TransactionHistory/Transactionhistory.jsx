import React from "react";

const TransactionHistory = () => {
  const factorRate = 1.2;
  const weeklyPaymentRate = 0.1; // e.g., 10% weekly

  const transactions = [
    {
      id: 1,
      amount: 5000,
      date: "2025-06-26",
      status: "Pending",
    },
    {
      id: 2,
      amount: 3200,
      date: "2025-06-25",
      status: "Approved",
    },
    {
      id: 3,
      amount: 7800,
      date: "2025-06-24",
      status: "Rejected",
    },
    {
      id: 4,
      amount: 2500,
      date: "2025-06-23",
      status: "Approved",
    },
    {
      id: 5,
      amount: 4100,
      date: "2025-06-22",
      status: "Pending",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "badge-success-soft";
      case "Pending":
        return "badge-warning-soft";
      case "Rejected":
        return "badge-danger-soft";
      default:
        return "badge-secondary";
    }
  };

  return (
    <div className="container mt-3 p-3">
      <h2 className="page-heading">My Draws / History</h2>
      <p className="page-subheading">Complete breakdown of all fund draws and status</p>

      <div className="card shadow-sm border-0 card-green">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-success text-dark">
                <tr>
                  <th>Date</th>
                  <th className="text-end">Amount Drawn</th>
                  <th className="text-end">Weekly Payment</th>
                  <th className="text-end">Total Due (1.2x)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((txn) => {
                    const weeklyPayment = txn.amount * weeklyPaymentRate;
                    const totalDue = txn.amount * factorRate;
                    return (
                      <tr key={txn.id}>
                        <td>
                          <i className="fas fa-calendar-alt text-secondary me-2"></i>
                          {txn.date}
                        </td>
                        <td className="text-end fw-semibold text-success">
                          ${txn.amount.toLocaleString()}
                        </td>
                        <td className="text-end">${weeklyPayment.toFixed(2)}</td>
                        <td className="text-end">${totalDue.toFixed(2)}</td>
                        <td>
                          <span className={`badge rounded-pill ${getStatusClass(txn.status)}`}>
                            {txn.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <i className="fas fa-info-circle fs-2 text-muted mb-2"></i>
                      <p className="text-muted mb-0">No draw history found.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <small className="text-muted">
              Showing <strong>1</strong> to <strong>5</strong> of <strong>{transactions.length}</strong> entries
            </small>
            <div>
              <button className="btn btn-outline-success btn-sm me-2">
                <i className="fas fa-chevron-left"></i> Prev
              </button>
              <button className="btn btn-outline-success btn-sm">
                Next <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
