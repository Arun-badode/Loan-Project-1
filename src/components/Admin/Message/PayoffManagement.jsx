import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

const PayoffManagement = () => {
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosInstance.get("/getAllEarlyPayoffs");
        console.log(res.data.data)
        if (Array.isArray(res.data)) {
          setRequests(res.data);
          setSelected(res.data[0] || null);
        } else {
          setError("Invalid response format.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleAction = async (action) => {
    if (!selected?._id) return;

    try {
      const res = await axiosInstance.patch(`/updateEarlyPayoffStatus/${selected._id}`, {
        status: action.toLowerCase(), // "approved" or "rejected"
      });

      if (res.data.success) {
        const updatedList = requests.map((req) =>
          req._id === selected._id ? { ...req, status: action.toLowerCase() } : req
        );
        setRequests(updatedList);
        setSelected({ ...selected, status: action.toLowerCase() });
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
      <h3 className="mb-3">Payoff Management</h3>
      <div className="row bg-white shadow rounded-3 overflow-hidden" style={{ minHeight: "75vh" }}>
        {/* Left: List */}
        <div className="col-md-4 border-end p-3">
          <h6 className="fw-bold mb-3">Requests</h6>
          {requests.map((req) => (
            <div
              key={req._id}
              className={`p-2 rounded mb-1 ${selected?._id === req._id ? "bg-light" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => setSelected(req)}
            >
              <div className="d-flex justify-content-between">
                <span className="fw-semibold">{req.customerName}</span>
                <small>{new Date(req.createdAt).toLocaleDateString()}</small>
              </div>
              <small className="text-muted">₹{req.earlyPayAmount} | Status: {req.status}</small>
            </div>
          ))}
        </div>

        {/* Right: Detail */}
        <div className="col-md-8 d-flex flex-column p-4">
          {selected ? (
            <>
              <h5 className="fw-bold">{selected.customerName}</h5>
              <div className="bg-light p-3 rounded mb-3">
                <p><strong>Early Pay Amount:</strong> ₹{selected.earlyPayAmount}</p>
                <p><strong>Discount:</strong> ₹{selected.discount}</p>
                <p><strong>Status:</strong> 
                  <span className={`badge ms-2 ${
                    selected.status === "approved"
                      ? "bg-success"
                      : selected.status === "rejected"
                      ? "bg-danger"
                      : "bg-warning text-dark"
                  }`}>
                    {selected.status.toUpperCase()}
                  </span>
                </p>
              </div>

              {selected.status === "pending" && (
                <div className="text-end mt-auto">
                  <button className="btn btn-danger me-2" onClick={() => handleAction("Rejected")}>
                    Reject
                  </button>
                  <button className="btn btn-success" onClick={() => handleAction("Approved")}>
                    Approve
                  </button>
                </div>
              )}

              {selected.status === "approved" && (
                <div className="alert alert-success mt-3">
                  Approved. Proceed with payment processing.
                </div>
              )}
              {selected.status === "rejected" && (
                <div className="alert alert-danger mt-3">
                  This request has been rejected.
                </div>
              )}
            </>
          ) : (
            <p>Select a request to see details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayoffManagement;
