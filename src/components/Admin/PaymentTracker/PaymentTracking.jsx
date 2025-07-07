import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

const PaymentTracking = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/getrepayments");
      if (res?.data?.result) {
        setPayments(res.data.result);
      }
    } catch (error) {
      console.error("❌ Error fetching repayments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReminder = (id) => {
    alert(`📩 Reminder sent for Payment ID: ${id}`);
    // Optional backend call can be added here
  };

  const markAsPaid = async (id) => {
    try {
      await axiosInstance.patch(`/paymentStatus/${id}`, {
        payStatus: "paid",
      });

      // 🔁 Refetch latest payments after marking paid
      fetchPayments();
    } catch (error) {
      console.error("❌ Failed to update status:", error);
    }
  };

  return (
    <div className="container mt-3 p-3">
      <h2 className="page-heading">Payment Tracking</h2>
      <p className="page-subheading">
        Monitor customer payments and take actions if needed.
      </p>

      <div className="card card-green shadow-sm border-0">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-3">Weekly Payment Status</h5>

          {loading ? (
            <p>Loading payments...</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-success">
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length > 0 ? (
                    payments.map((payment, index) => (
                      <tr key={payment._id}>
                        <td>{index + 1}</td>
                        <td>{payment.customerId?.customerName || "N/A"}</td>
                        <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                        <td className="fw-bold text-success">
                          ${payment.payAmount?.toLocaleString()}
                        </td>
                        <td>
                          <span className={`badge rounded-pill px-3 py-2 fw-semibold text-uppercase ${
                              payment.payStatus?.toLowerCase() === "paid"
                                ? "bg-success text-white"
                                : payment.payStatus?.toLowerCase() === "missed"
                                ? "bg-danger"
                                : "bg-warning text-dark" }`}>
                            {payment.payStatus || "Pending"}
                          </span>
                        </td>
                        <td>
                          {payment.payStatus?.toLowerCase() !== "paid" ? (
                            <>
                              <button
                                className="btn btn-sm btn-outline-success me-2 mb-1"
                                onClick={() => handleReminder(payment._id)}
                              >
                                Send Reminder
                              </button>
                              <button
                                className="btn btn-sm btn-success mb-1"
                                onClick={() => markAsPaid(payment._id)}
                              >
                                Mark as Paid
                              </button>
                            </>
                          ) : (
                            <span className="text-muted small">No action needed</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted">
                        No repayment data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentTracking;
