import React, { useState } from "react";

const Requestfund = () => {
  // Example values, replace with real data from backend
  const approvedLimit = 10000;
  const [currentBalance, setCurrentBalance] = useState(5000); // e.g. 50% used
  const [amount, setAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [drawError, setDrawError] = useState("");
  const [drawSuccess, setDrawSuccess] = useState("");
  const [showCreditIncrease, setShowCreditIncrease] = useState(
    approvedLimit - currentBalance >= approvedLimit * 0.5
  );

  // Draw fee logic
  const getDrawFee = (amt) => {
    if (amt < currentBalance * 0.25) {
      return amt * 0.02;
    }
    return 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amt = Number(amount);
    if (!amt || amt <= 0) {
      setDrawError("Please enter a valid amount.");
      setDrawSuccess("");
      return;
    }
    if (amt > currentBalance) {
      setDrawError("Amount exceeds available balance.");
      setDrawSuccess("");
      return;
    }
    setCurrentBalance(currentBalance - amt);
    setDrawSuccess(
      `Draw request successful! Amount: $${amt.toLocaleString()}${
        getDrawFee(amt) > 0
          ? `, Fee: $${getDrawFee(amt).toLocaleString()}`
          : ", No fee applied."
      } Funds will be credited in 24–48 hours.`
    );
    setDrawError("");
    setSubmitted(true);
    setAmount("");
    // If after this draw, 50% is repaid, show credit increase notification
    if (approvedLimit - (currentBalance - amt) >= approvedLimit * 0.5) {
      setShowCreditIncrease(true);
    }
  };

  return (
    <div className="mt-3 p-3">
      <div className="col-12 col-md-12">
        <h2 className="page-heading">Request Funds</h2>
        <p className="page-subheading">
          Withdraw funds from your approved limit. No need to provide a reason or
          documents unless specifically requested.
        </p>

        {/* Credit Increase Notification */}
        {showCreditIncrease && (
          <div className="alert alert-info">
            <strong>
              Congratulations, you may be eligible for a credit increase.
            </strong>
            <br />
            Submit your most recent business bank statements and AR/PO if you have
            any.
          </div>
        )}

        <div className="card shadow-sm border-0 overflow-hidden">
          <div className="card-body card-green">
            {/* Approved Limit and Factor Rate */}
            <div className="mb-4">
              <p className="mb-2">
                <strong>Approved Limit:</strong> ${approvedLimit.toLocaleString()}
              </p>
              <p className="mb-2">
                <strong>Available Balance:</strong> ${currentBalance.toLocaleString()}
              </p>
            </div>

            {submitted && drawSuccess ? (
              <div className="alert alert-success">✅ {drawSuccess}</div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  {/* Amount to Withdraw */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-medium">
                      Amount to Withdraw
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        className="form-control input-green"
                        placeholder="0.00"
                        value={amount}
                        min={1}
                        max={currentBalance}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                      />
                    </div>
                    {amount && (
                      <div className="mt-2">
                        <strong>Draw Fee:</strong>{" "}
                        ${getDrawFee(Number(amount)).toLocaleString()}
                        <br />
                        <small>
                          {Number(amount) < currentBalance * 0.25
                            ? "2% fee applies for drawing less than 25% of available balance."
                            : "No fee for drawing 25% or more of available balance."}
                        </small>
                      </div>
                    )}
                    {drawError && (
                      <div className="alert alert-danger mt-2">{drawError}</div>
                    )}
                  </div>

                  {/* Upload Toggle (only if admin requests) */}
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
                      <label className="form-label fw-medium">
                        Supporting Documents
                      </label>
                      <div className="border border-2 border-secondary border-dashed p-4 rounded text-center bg-light-subtle">
                        <i className="fas fa-cloud-upload-alt text-secondary fs-2 mb-2 d-block"></i>
                        <label htmlFor="file-upload" className="form-label">
                          <span className="text-success fw-semibold cursor-pointer">
                            Upload files
                          </span>{" "}
                          or drag and drop
                        </label>
                        <input
                          type="file"
                          id="file-upload"
                          multiple
                          className="form-control d-none"
                        />
                        <p className="text-muted small">PDF, DOC up to 10MB</p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="col-12">
                    <button type="submit" className="btn btn-success  py-2">
                      Submit Request
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
        <div className="alert alert-success mt-4">
          <i className="fas fa-info-circle me-2"></i>
          Approval is handled outside the app by our underwriting and sales team.
          You can request funds up to your available balance. For credit increase
          requests (after 50% repayment), please submit updated business bank
          statements and AR/PO.
        </div>
      </div>
    </div>
  );
};

export default Requestfund;
