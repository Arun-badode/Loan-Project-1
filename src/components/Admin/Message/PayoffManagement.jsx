import React, { useState } from "react";

const discountRequests = [
  {
    id: 1,
    name: "Emma Thompson",
    email: "emma.thompson@email.com",
    requestDate: "2025-06-24",
    status: "pending",
    amountRequested: "$5,000",
    note: "Requesting early payoff discount for draw #3",
  },
  {
    id: 2,
    name: "James Wilson",
    email: "james.w@email.com",
    requestDate: "2025-06-22",
    status: "approved",
    amountRequested: "$3,000",
    note: "Requested early payoff on full balance.",
  },
  {
    id: 3,
    name: "Sarah Miller",
    email: "sarah.m@email.com",
    requestDate: "2025-06-20",
    status: "denied",
    amountRequested: "$2,500",
    note: "Requested discount, documents pending.",
  },
];

const PayoffManagement = () => {
  const [selectedRequest, setSelectedRequest] = useState(discountRequests[0]);

  const handleAction = (action) => {
    alert(`${action} request for ${selectedRequest.name}`);
    // You can add API logic here to update backend
  };

  return (
    <div className="" style={{ minHeight: "100vh", padding: "2rem" }}>
      <h3 className="page-heading mb-3"> Payoff Management</h3>
      <div
        className="row bg-white shadow rounded-3 overflow-hidden"
        style={{ minHeight: "75vh" }}
      >
        {/* Left Panel: List of Requests */}
        <div className="col-md-4 border-end p-3 card-green">
          <h6 className="fw-bold mb-3">Early Discount Requests</h6>
          {discountRequests.map((req) => (
            <div
              key={req.id}
              className={`p-2 rounded mb-1 ${
                selectedRequest.id === req.id ? "bg-white" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedRequest(req)}
            >
              <div className="d-flex justify-content-between">
                <span className="fw-semibold">{req.name}</span>
                <small className="text-muted">{req.requestDate}</small>
              </div>
              <div className="text-muted small">{req.note}</div>
            </div>
          ))}
        </div>

        {/* Right Panel: Request Details */}
        <div className="col-md-8 d-flex flex-column p-4 card-green">
          <div>
            <h6 className="fw-bold">{selectedRequest.name}</h6>
            <p className="text-muted mb-1 small">
              {selectedRequest.email || "—"}
            </p>
            <p className="text-muted small">
              Requested On: {selectedRequest.requestDate}
            </p>
            <div className="bg-light p-3 rounded mb-4">
              <p className="mb-1">
                <strong>Amount Requested:</strong> {selectedRequest.amountRequested}
              </p>
              <p className="mb-0">
                <strong>Note:</strong> {selectedRequest.note}
              </p>
              <p className="mt-2 mb-0">
                <strong>Status:</strong>{" "}
                <span className={`badge ${
                  selectedRequest.status === "approved"
                    ? "bg-success"
                    : selectedRequest.status === "denied"
                    ? "bg-danger"
                    : "bg-warning text-dark"
                }`}>
                  {selectedRequest.status.toUpperCase()}
                </span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-auto">
            {selectedRequest.status === "pending" && (
              <div className="text-end">
                <button
                  className="btn btn-danger me-2"
                  onClick={() => handleAction("Denied")}
                >
                  Deny
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => handleAction("Approved")}
                >
                  Approve
                </button>
              </div>
            )}

            {(selectedRequest.status === "approved") && (
              <div className="alert alert-success mt-3 mb-0">
                Approval done. Please manually initiate ACH or wire transfer.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoffManagement;
