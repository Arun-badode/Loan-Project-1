import React, { useState } from "react";

const Requestfund = () => {
  const [amount, setAmount] = useState(0);
  const [showUpload, setShowUpload] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const approvedLimit = 10000;
  const factorRate = 1.2;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mt-3 p-3">
      <div className="col-12 col-md-12">
        <h2 className="page-heading">Request Funds</h2>
        <p className="page-subheading">
          Withdraw funds from your approved limit.
        </p>

        <div className="card shadow-sm border-0 overflow-hidden">
          <div className="card-body card-green">
            {/* Approved Limit and Factor Rate */}
            <div className="mb-4">
              <p className="mb-2">
                <strong>Approved Limit:</strong> ${approvedLimit.toLocaleString()}
              </p>
              <p className="mb-0">
                <strong>Factor Rate:</strong> {factorRate}x
              </p>
            </div>

            {submitted ? (
              <div className="alert alert-success">
                ✅ Your request has been submitted and is pending review.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  {/* Amount to Withdraw */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-medium">Amount to Withdraw</label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        className="form-control input-green"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Upload Toggle */}
                  <div className="col-12 col-md-6 d-flex align-items-end">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="toggleUpload"
                        checked={showUpload}
                        onChange={() => setShowUpload(!showUpload)}
                      />
                      <label className="form-check-label" htmlFor="toggleUpload">
                        Upload Supporting Documents (if requested)
                      </label>
                    </div>
                  </div>

                  {/* Upload Field (conditionally shown) */}
                  {showUpload && (
                    <div className="col-12">
                      <label className="form-label fw-medium">Supporting Documents</label>
                      <div className="border border-2 border-secondary border-dashed p-4 rounded text-center bg-light-subtle">
                        <i className="fas fa-cloud-upload-alt text-secondary fs-2 mb-2 d-block"></i>
                        <label htmlFor="file-upload" className="form-label">
                          <span className="text-success fw-semibold cursor-pointer">Upload files</span> or drag and drop
                        </label>
                        <input type="file" id="file-upload" multiple className="form-control d-none" />
                        <p className="text-muted small">PDF, DOC up to 10MB</p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="col-12">
                    <button type="submit" className="btn btn-success w-100 py-2">
                      Submit Request
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requestfund;
