import React, { useState } from "react";

const FundingBalanceTracker = () => {
  const [transactions] = useState([
    { id: 1, date: "2025-06-01", amount: 5000, type: "Draw" },
    { id: 2, date: "2025-06-10", amount: 2000, type: "Repayment" },
    { id: 3, date: "2025-06-15", amount: 3000, type: "Draw" },
    { id: 4, date: "2025-06-20", amount: 1500, type: "Repayment" },
  ]);

  const totalDraws = transactions
    .filter((t) => t.type === "Draw")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalRepayments = transactions
    .filter((t) => t.type === "Repayment")
    .reduce((sum, t) => sum + t.amount, 0);

  const remainingBalance = totalDraws - totalRepayments;

  return (
    <div className="container mt-3 p-3">
      <h2 className="page-heading">Funding & Balance Tracker</h2>
      <p className="page-subheading">
        Overview of total draws, remaining balance, and transaction history.
      </p>

      <div className="row g-4">
        {/* Summary Cards */}
        <div className="col-12 col-md-4">
          <div className="card card-green shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Amount Drawn</h6>
              <h3 className="fw-bold text-success">${totalDraws.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card card-green shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Repayments</h6>
              <h3 className="fw-bold text-success">${totalRepayments.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card card-green shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Remaining Balance</h6>
              <h3 className="fw-bold text-success">${remainingBalance.toLocaleString()}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="card card-green shadow-sm border-0 mt-4">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-3">Transaction Log</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-success">
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn.id}>
                    <td>{txn.date}</td>
                    <td>
                      <span className={`badge rounded-pill px-3 py-1 fw-semibold ${
                        txn.type === "Draw"
                          ? "bg-success text-white"
                          : "bg-light text-success border border-success"
                      }`}>
                        {txn.type}
                      </span>
                    </td>
                    <td className="fw-bold text-success">${txn.amount.toLocaleString()}</td>
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

export default FundingBalanceTracker;
