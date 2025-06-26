import React from "react";

const Customerdashboard = () => {
  const transactions = [
    {
      id: "TXN-2025-06-26-001",
      date: "2025-06-26",
      amount: 25000,
      status: "Completed",
    },
    {
      id: "TXN-2025-06-25-003",
      date: "2025-06-25",
      amount: 50000,
      status: "Processing",
    },
    {
      id: "TXN-2025-06-24-002",
      date: "2025-06-24",
      amount: 75000,
      status: "Completed",
    },
  ];

  return (
    <div className="container py-5">
      {/* Greeting */}
      <div className="mb-4">
        <h1 className="page-heading">Hello Customer</h1>
        <p className="page-subheading">Welcome to Your Dashboard</p>
      </div>

      {/* Top 3 Cards */}
      <div className="row g-4">
        <div className="col-md-4 ">
          <div className="card shadow-sm ">
            <div className="card-body card-green">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <small className="text-muted">Total Line of Credit</small>
                <div className="rounded-circle bg-light p-2">
                  <i className="fas fa-credit-card text-success"></i>
                </div>
              </div>
              <h4 className="fw-semibold">1,250</h4>
              <p className="text-muted small mb-0">+8.5% from last month</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body card-green">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <small className="text-muted">Amount Used</small>
                <div className="rounded-circle bg-light p-2">
                  <i className="fas fa-chart-pie text-primary"></i>
                </div>
              </div>
              <h4 className="fw-semibold">$150,000,000</h4>
              <p className="text-muted small mb-0">+12% from last month</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body card-green">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <small className="text-muted">Available Balance</small>
                <div className="rounded-circle bg-light p-2">
                  <i className="fas fa-wallet text-success"></i>
                </div>
              </div>
              <h4 className="fw-semibold">$60,000,000</h4>
              <p className="text-muted small mb-0">+5% from last month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Summary & Transactions */}
      <div className="row g-4 mt-4">
        {/* Credit Summary */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body card-green">
              <div className="d-flex justify-content-between mb-3">
                <h5 className="card-title fw-semibold">Credit Summary</h5>
              </div>
              {/* Dummy Circular Progress Placeholder */}
              <div className="d-flex justify-content-center mb-4">
                <div
                  className="rounded-circle border border-5 border-success"
                  style={{ width: "150px", height: "150px" }}
                ></div>
              </div>

              {/* Summary Details */}
              <ul className="list-group list-group-flush card-green">
                <li className="list-group-item d-flex justify-content-between card-green">
                  <span className="text-muted small">Total Loan</span>
                  <strong>$150,000,000</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between card-green" >
                  <span className="text-muted small">Pending Balance</span>
                  <strong>$90,000,000</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body card-green">
              <div className="d-flex justify-content-between mb-3">
                <h5 className="card-title fw-semibold">Recent Transactions</h5>
                <button className="btn btn-link text-success btn-sm">
                  View All
                </button>
              </div>

              <div className="table-responsive">
                <table className="table table-sm align-middle table-green">
                  <thead className="table-light">
                    <tr>
                      <th>Transaction ID</th>
                      <th>Date</th>
                      <th className="text-end">Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.date}</td>
                        <td className="text-end">${item.amount.toLocaleString()}</td>
                        <td>
                          <span
                            className={`badge rounded-pill ${
                              item.status === "Completed"
                                ? "bg-success-subtle text-success"
                                : item.status === "Processing"
                                ? "bg-warning-subtle text-warning"
                                : "bg-danger-subtle text-danger"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customerdashboard;
