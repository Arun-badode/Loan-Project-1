import React, { useState } from "react";

const Requestfund = () => {
  const [activeTab, setActiveTab] = useState("new");

  const previousRequests = [
    { id: 1, date: "2025-06-20", amount: 5000, purpose: "Marketing Campaign", status: "approved" },
    { id: 2, date: "2025-06-22", amount: 2500, purpose: "Office Supplies", status: "pending" },
    { id: 3, date: "2025-06-24", amount: 8000, purpose: "Team Building Event", status: "rejected" },
    { id: 4, date: "2025-06-25", amount: 3500, purpose: "Software Licenses", status: "pending" },
  ];

  return (
    <div className="mt-3 p-3">
      <div className="col-12 col-md-12">
        <h2 className="page-heading">Request Funds</h2>
        <p className="page-subheading">
          Submit a new fund request or review your previous submissions below.
        </p>

        <div className="card shadow-sm border-0 overflow-hidden">
          <div className="card-body card-green">
            {/* Tabs */}
            <ul className="nav nav-tabs mb-4 gap-2 flex-nowrap border-0">
              <li className="nav-item">
                <button
                  className={`nav-link rounded-pill px-4 py-2 fw-semibold ${activeTab === "new"
                      ? "bg-success text-white"
                      : "text-success border border-success"
                    }`}
                  onClick={() => setActiveTab("new")}
                  style={{ whiteSpace: "nowrap" }}
                >
                  New Request
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link rounded-pill px-4 py-2 fw-semibold ${activeTab === "previous"
                      ? "bg-success text-white"
                      : "text-success border border-success"
                    }`}
                  onClick={() => setActiveTab("previous")}
                  style={{ whiteSpace: "nowrap" }}
                >
                  Previous Requests
                </button>
              </li>
            </ul>


            {/* Tab Content */}
            {activeTab === "new" ? (
              <div className="row g-4">
                {/* Amount */}
                <div className="col-12 col-md-6">
                  <label className="form-label fw-medium">Amount</label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input type="text" className="form-control input-green" placeholder="0.00" />
                  </div>
                </div>

                {/* Date */}
                <div className="col-12 col-md-6">
                  <label className="form-label fw-medium">Date Needed</label>
                  <input type="date" className="form-control input-green" />
                </div>

                {/* Description */}
                <div className="col-12">
                  <label className="form-label fw-medium">Purpose / Description</label>
                  <textarea
                    className="form-control textarea-green"
                    rows="4"
                    placeholder="Please describe the purpose of this request..."
                  ></textarea>
                </div>

                {/* File Upload */}
                <div className="col-12">
                  <label className="form-label fw-medium">Supporting Documents</label>
                  <div className="border border-2 border-secondary border-dashed p-4 rounded text-center bg-light-subtle">
                    <i className="fas fa-cloud-upload-alt text-secondary fs-2 mb-2 d-block"></i>
                    <label htmlFor="file-upload" className="form-label">
                      <span className="text-primary fw-semibold cursor-pointer">Upload files</span> or drag and drop
                    </label>
                    <input type="file" id="file-upload" multiple className="form-control d-none" />
                    <p className="text-muted small">PDF, DOC up to 10MB</p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="col-12">
                  <button type="submit" className="btn btn-success w-100 py-2">
                    Submit Request
                  </button>
                </div>
              </div>
            ) : (
              <div className="table-responsive table-green">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Request Date</th>
                      <th>Amount</th>
                      <th>Purpose</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previousRequests.map((request) => (
                      <tr key={request.id}>
                        <td>{request.date}</td>
                        <td>${request.amount.toLocaleString()}</td>
                        <td>{request.purpose}</td>
                        <td>
                          <span
                            className={`badge rounded-pill text-capitalize ${request.status === "approved"
                              ? "bg-success-subtle text-success"
                              : request.status === "pending"
                                ? "bg-warning-subtle text-warning"
                                : "bg-danger-subtle text-danger"
                              }`}
                          >
                            {request.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requestfund;
