import React, { useState } from "react";

const Requestfund = () => {
  const [activeTab, setActiveTab] = useState("new");

  const previousRequests = [
    {
      id: 1,
      date: "2025-06-20",
      amount: 5000,
      purpose: "Marketing Campaign",
      status: "approved",
    },
    {
      id: 2,
      date: "2025-06-22",
      amount: 2500,
      purpose: "Office Supplies",
      status: "pending",
    },
    {
      id: 3,
      date: "2025-06-24",
      amount: 8000,
      purpose: "Team Building Event",
      status: "rejected",
    },
    {
      id: 4,
      date: "2025-06-25",
      amount: 3500,
      purpose: "Software Licenses",
      status: "pending",
    },
  ];

  return (
    <div className="container-flud py-5">
      <div className="row justify-content-center">
        <div className="col-lg-11">
            <h2 className="mb-4 fw-bold">Request Funds</h2>
          <div className="card shadow-sm">
              
            <div className="card-body">
            

              {/* Tabs */}
              <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "new" ? "active" : ""}`}
                    onClick={() => setActiveTab("new")}
                  >
                    New Request
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "previous" ? "active" : ""}`}
                    onClick={() => setActiveTab("previous")}
                  >
                    Previous Requests
                  </button>
                </li>
              </ul>

              {/* Tab Content */}
              {activeTab === "new" ? (
                <form className="row g-3">
                  {/* Amount */}
                  <div className="col-12">
                    <label className="form-label fw-medium">Amount</label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="col-12">
                    <label className="form-label fw-medium">Purpose / Description</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Please describe the purpose of this request..."
                    ></textarea>
                  </div>

                  {/* Date */}
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Date Needed</label>
                    <input type="date" className="form-control" />
                  </div>

                  {/* File Upload */}
                  <div className="col-12">
                    <label className="form-label fw-medium">Supporting Documents</label>
                    <div className="border border-2 border-secondary border-dashed p-4 rounded text-center">
                      <i className="fas fa-cloud-upload-alt text-secondary fs-2 mb-2 d-block"></i>
                      <label htmlFor="file-upload" className="form-label">
                        <span className="text-primary fw-semibold cursor-pointer">
                          Upload files
                        </span>{" "}
                        or drag and drop
                      </label>
                      <input
                        type="file"
                        id="file-upload"
                        multiple
                        className="form-control"
                        style={{ display: "none" }}
                      />
                      <p className="text-muted small">PDF, DOC up to 10MB</p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="col-12 pt-3">
                    <button type="submit" className="btn btn-primary w-100">
                      Submit Request
                    </button>
                  </div>
                </form>
              ) : (
                <div className="table-responsive">
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
                              className={`badge rounded-pill text-capitalize ${
                                request.status === "approved"
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
    </div>
  );
};

export default Requestfund;
