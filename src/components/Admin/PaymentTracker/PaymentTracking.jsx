import React, { useState } from "react";

const PaymentTracking = () => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      customer: "John Doe",
      dueDate: "2025-07-01",
      weeklyPayment: 500,
      status: "Paid",
    },
    {
      id: 2,
      customer: "Jane Smith",
      dueDate: "2025-07-02",
      weeklyPayment: 750,
      status: "Missed",
    },
    {
      id: 3,
      customer: "Alice Johnson",
      dueDate: "2025-07-03",
      weeklyPayment: 600,
      status: "Paid",
    },
    {
      id: 4,
      customer: "Bob Brown",
      dueDate: "2025-07-04",
      weeklyPayment: 550,
      status: "Missed",
    },
  ]);

  const handleReminder = (id) => {
    alert(`Reminder sent for Payment ID: ${id}`);
  };

  const markAsPaid = (id) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Paid" } : p))
    );
  };

  return (
    <div className="container mt-3 p-3">
      <h2 className="page-heading">Payment Tracking</h2>
      <p className="page-subheading">Monitor customer payments and take actions if needed.</p>

      <div className="card card-green shadow-sm border-0">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-3">Weekly Payment Status</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-success">
                <tr>
                  <th>Customer</th>
                  <th>Due Date</th>
                  <th>Weekly Payment</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.customer}</td>
                    <td>{payment.dueDate}</td>
                    <td className="fw-bold text-success">${payment.weeklyPayment.toLocaleString()}</td>
                    <td>
                      <span
                        className={`badge rounded-pill px-3 py-2 fw-semibold text-uppercase ${
                          payment.status === "Paid"
                            ? "bg-success text-white"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td>
                      {payment.status === "Missed" ? (
                        <>
                          <button
                            className="btn btn-sm btn-outline-success me-2 mb-1"
                            onClick={() => handleReminder(payment.id)}
                          >
                            Send Reminder
                          </button>
                          <button
                            className="btn btn-sm btn-success mb-1"
                            onClick={() => markAsPaid(payment.id)}
                          >
                            Mark as Paid
                          </button>
                        </>
                      ) : (
                        <span className="text-muted small">No action needed</span>
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

export default PaymentTracking;
