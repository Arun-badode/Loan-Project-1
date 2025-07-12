  import React, { useEffect, useState } from "react";
  import axiosInstance from "../../../utils/axiosInstance.js";
import Loader from "../../../utils/Loader.jsx";

  const CreditUpgradeRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ✅ Reusable fetch function
    const fetchRequests = async () => {
      try {
        const res = await axiosInstance.get("/CreditUpgardeRequest");
        setRequests(res.data.data || []);
      } catch (err) {
        console.error("❌ Failed to fetch requests:", err);
        setError("Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    // ✅ Fetch on mount
    useEffect(() => {
      fetchRequests();
    }, []);

    // ✅ Update status and re-fetch
  const updateStatus = async (id, status) => {
  try {
    const res = await axiosInstance.patch(
      `/updateCreditUpgradeStatus/${id}`,
      { creditUpgradeStatus: status }
    );

    if (res.status === 200) {
      alert(`✅ Request ${status} successfully!`);
      await fetchRequests(); // Refresh the table
    } else {
      alert("❌ Failed to update request status.");
    }
  } catch (err) {
    console.error("❌ Error updating status:", err);
    alert("❌ Something went wrong.");
  }
};


    if (loading) return <Loader/>;
    if (error) return <div className="p-4 text-danger">{error}</div>;

    return (
      <div className="container mt-3 p-3">
        <h2 className="page-heading">Credit Upgrade Requests</h2>
        <p className="page-subheading">
          Review and manage credit upgrade requests submitted by Merchant.
        </p>

        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h5 className="fw-semibold mb-3">Submitted Requests</h5>

            {requests.length === 0 ? (
              <p className="text-muted">No credit upgrade requests found.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-success">
                    <tr>
                      <th>Merchant  ID</th>
                      <th>Merchant Name</th>
                      <th>Repayment</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Document</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((req) => {
                      const {
                        _id,
                        customerId,
                        customerName,
                        repaymentDonePercent,
                        requestedAmount,
                        createdAt,
                        document,
                        creditUpgradeStatus,
                      } = req;

                      const formattedDate = createdAt
                        ? new Date(createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "-";

                      const status = creditUpgradeStatus || "Pending";

                      return (
                        <tr key={_id}>
                          <td>{customerId?.slice(-9) || "UNKNOWN"}</td>
                          <td>{customerName || "Unnamed"}</td>
                          <td>{repaymentDonePercent || "0%"}</td>
                          <td className="fw-bold text-success">
                            ${Number(requestedAmount).toLocaleString()}
                          </td>
                          <td>{formattedDate}</td>
                          <td>
                            {document ? (
                              <a href={document}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-outline-primary">
                                View
                              </a> ) : (
                              <span className="text-muted">No doc</span>
                            )}
                          </td>
                          <td>
                            <span
                              className={`badge rounded-pill px-3 py-2 fw-semibold text-uppercase ${
                                status === "Approved"
                                  ? "bg-success text-white"
                                  : status === "Rejected"
                                  ? "bg-danger text-white"
                                  : "bg-warning text-dark"}`}>
                              {status}
                            </span>
                          </td>
                          <td>
                            {status === "pending" || !status ? (
                              <>
                                <button
                                  className="btn btn-sm btn-success me-2 mb-1"
                                  onClick={() => updateStatus(_id, "Approved")}
                                >
                                  Approved
                                </button>
                                <button
                                  className="btn btn-sm btn-danger mb-1"
                                  onClick={() => updateStatus(_id, "Rejected")}
                                >
                                  Reject
                                </button>
                              </>
                            ) : (
                              <span className="text-muted small">No Action</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default CreditUpgradeRequests;
