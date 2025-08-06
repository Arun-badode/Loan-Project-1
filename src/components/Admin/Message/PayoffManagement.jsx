import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import Loader from "../../../utils/Loader";

const PayoffManagement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all early payoff requests
  const fetchRequests = async () => {
    try {
      const res = await axiosInstance.get(`/getAllEarlyPayoffs`);
      const allRequests = res.data.data;
      console.log(allRequests)
      setRequests(allRequests);
    } catch (err) {
      console.error("❌ Fetch Error:", err);
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Update early payoff status
 const handleAction = async (id, action) => {
  try {
    const res = await axiosInstance.patch(`/updateEarlyPayoffStatus/${id}`, {
      earlyPayoffStatus: action.toLowerCase(),
    });

    console.log(res);

    if (res.data && res.data.message) {
      alert(`✅ ${res.data.message}`);
      fetchRequests(); // re-fetch updated data 
    } else {
      alert("❌ Action failed.");
    }
  } catch (err) {
    console.error(err);
    alert("❌ Error while processing action.");
  }
};


  if (loading) return <Loader/>;
  if (error) return <div className="p-4 text-danger">{error}</div>;

  return (
    <div className="p-4" >
      <h3 className="mb-4">Payoff Management</h3>
   <div className="card shadow-sm border-0">
          <div className="card-body">
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-success">
            <tr>
              <th>Account Number</th>
              <th>Date</th>
              <th>Merchant Name</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No requests found.
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req._id}>
                  <td>
                    {req.einNumber || "UNKNOWN"}
                  </td>
                  <td>
  {new Date(req.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}
</td>

                  <td>{req.customerId?.customerName || "UNNAMED"}</td>
                  <td>${req.earlyPayAmount}</td>
                  <td>
                    <span
                      className={`badge ${
                        req.earlyPayoffStatus === "approved"
                          ? "bg-success"
                          : req.earlyPayoffStatus === "rejected"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {req.earlyPayoffStatus.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    {req.earlyPayoffStatus === "pending" ? (
                      <>
                        <button
                          className="btn btn-sm btn-success me-2"
                          onClick={() => handleAction(req._id, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleAction(req._id, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    ) : req.earlyPayoffStatus === "approved" ? (
                      <span className="text-success">Approved</span>
                    ) : (
                      <span className="text-danger">Rejected</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      </div>
      </div>
    </div>
  );
};

export default PayoffManagement;
