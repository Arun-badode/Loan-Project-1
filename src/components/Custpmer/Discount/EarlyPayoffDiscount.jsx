import React, { useState } from "react";

const EarlyPayoffDiscount = () => {
  const [requested, setRequested] = useState(false);
  const [drawnAmount, setDrawnAmount] = useState(10000); // Example amount
  const discountRate = 0.05; // 5%

  const estimatedDiscount = drawnAmount * discountRate;

  const handleRequest = () => {
    setRequested(true);
    // Here you can add logic to notify admin or trigger API
  };

  return (
    <div className="container mt-3 p-3">
      <h2 className="page-heading">Early Payoff Discount</h2>
      <p className="page-subheading">
        Access 100% of your funds within <strong>60 days</strong> and pay back within <strong>30 days</strong> — Get <strong>5% discount</strong>.
      </p>

      <div className="card shadow-sm border-0 card-green">
        <div className="card-body">
          {!requested ? (
            <>
              <p className="mb-3">
                Based on your drawn amount of <strong>${drawnAmount.toLocaleString()}</strong>,
                you are eligible for an estimated discount of:
              </p>
              <h4 className="text-success fw-bold mb-4">
                ${estimatedDiscount.toFixed(2)} off
              </h4>

              <button
                className="btn btn-success px-4 py-2 fw-semibold"
                onClick={handleRequest}
              >
                Request Early Payoff Discount
              </button>
            </>
          ) : (
            <div className="text-center">
              <i className="fas fa-check-circle text-success fs-2 mb-3"></i>
              <h5 className="text-success">Request Sent!</h5>
              <p className="text-muted">Your request for early payoff discount has been sent to the admin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EarlyPayoffDiscount;
