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
    <div className="p-3 mt-3">
      {/* Greeting */}
      <div className="mb-4">
        <h1 className="page-heading">Hello Customer</h1>
        <p className="page-subheading">Welcome to Your Dashboard</p>
      </div>

      {/* Top 3 Cards */}
      <div className="row g-4">
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card shadow-sm h-100 card-green border-0">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">TOTAL LINE OF CREDIT</h6>
                <div className=" bg-opacity-10 p-3 rounded-circle">
                  <i className="fas fa-credit-card fa-lg text-success"></i>
                </div>
              </div>
              <h2 className="fw-bold mb-1">1,250</h2>
              <p className=" small mb-0">
                <i className="fas fa-arrow-up text-success me-1"></i>
                +8.5% from last month
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card shadow-sm h-100 card-green border-0">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className=" mb-0">AMOUNT USED</h6>
                <div className="bg-opacity-10 p-3 rounded-circle">
                  <i className="fas fa-chart-pie fa-lg text-success"></i>
                </div>
              </div>
              <h2 className="fw-bold mb-1">$150,000,000</h2>
              <p className=" small mb-0">
                <i className="fas fa-arrow-up text-success me-1"></i>
                +12% from last month
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-12 col-lg-4">
          <div className="card shadow-sm h-100 card-green border-0">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className=" mb-0">AVAILABLE BALANCE</h6>
                <div className="bg-opacity-10 p-3 rounded-circle">
                  <i className="fas fa-wallet fa-lg text-success"></i>
                </div>
              </div>
              <h2 className="fw-bold mb-1">$60,000,000</h2>
              <p className=" small mb-0">
                <i className="fas fa-arrow-up text-success me-1"></i>
                +5% from last month
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Summary & Transactions */}
      <div className="row g-4 mt-4">
        {/* Credit Summary */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm h-100 card-green">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title fw-semibold mb-0">Credit Summary</h5>
                <button className="btn btn-sm btn-outline-success">
                  Download Report
                </button>
              </div>

              {/* Circular Progress */}
              <div className="d-flex justify-content-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle border border-5 border-success text-success fw-bold"
                  style={{
                    width: "150px",
                    height: "150px",
                    fontSize: "1.2rem",
                  }}
                >
                  60% Used
                </div>
              </div>

              <ul className="list-group d-flex gap-2 list-group-flush">
                <li className="list-group-item d-flex justify-content-between card-green">
                  <span className="text-muted small">Total Loan</span>
                  <strong>$150,000,000</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between card-green">
                  <span className="text-muted small">Pending Balance</span>
                  <strong>$90,000,000</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm h-100 card-green">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title fw-semibold mb-0">Recent Transactions</h5>
                <button className="btn btn-outline-success text-decoration-none btn-sm view-all-btn">
                  View All
                </button>
              </div>

              <div className="table-responsive">
                <table className="table table-sm table-hover align-middle border shadow-sm rounded overflow-hidden">
                  <thead className="table-success text-dark">
                    <tr>
                      <th>Transaction ID</th>
                      <th>Date</th>
                      <th className="text-end">Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((item, index) => (
                      <tr
                        key={item.id}
                        className={index % 2 === 0 ? "bg-white" : "bg-light"}
                      >
                        <td>{item.id}</td>
                        <td>{item.date}</td>
                        <td className="text-end text-success fw-semibold">
                          ${item.amount.toLocaleString()}
                        </td>
                        <td>
                          <span
                            className={`badge rounded-pill px-3 py-2 fw-semibold text-uppercase ${item.status === "Completed"
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
