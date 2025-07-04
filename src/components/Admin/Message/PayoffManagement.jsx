import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

const PayoffManagement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosInstance.get("/getAllEarlyPayoffs");
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

    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const res = await axiosInstance.patch(
        `/updateEarlyPayoffStatus/${id}`,
        {
          earlyPayoffStatus: action.toLowerCase(),
        }
      );

      if (res.data.success) {
        const updatedList = requests.map((req) =>
          req._id === id
            ? { ...req, earlyPayoffStatus: action.toLowerCase() }
            : req
        );
        setRequests(updatedList);
        alert(`✅ ${action} successful`);
      } else {
        alert("❌ Action failed.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error while processing action.");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-danger">{error}</div>;

  return (
    <div className="p-4" style={{ minHeight: "100vh" }}>
      <h3 className="mb-4">Payoff Management</h3>

      <div className="table-responsive shadow rounded">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Customer</th>
              <th>Amount</th>
              <th>Discount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
    <tbody>
  {requests.length === 0 ? (
    <tr>
      <td colSpan="8" className="text-center text-muted">
        No requests found.
      </td>
    </tr>
  ) : (
    requests.map((req) => (
      <tr key={req._id}>
        <td>{req.customerName || "Unnamed"}</td> {/* ✅ Fixed here */}
        <td>₹{req.earlyPayAmount}</td>
        <td>₹{req.discount || 0}</td>
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
          {new Date(req.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
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
  );
};

export default PayoffManagement;
