import React, { useState } from "react";
import { Card } from 'react-bootstrap';

const EarlyPayoffDiscount = () => {
  // Example values, replace with real data or API as needed
  const [requested, setRequested] = useState(false);

  // Admin-set values (these should come from backend/admin panel)
  const drawnAmount = 10000; // Example: total amount drawn by client
  const originalLimit = 10000; // Example: original approved limit
  const accessedWithinDays = 10; // Admin can set: e.g. must access within 10 days
  const paybackWithinDays = 30; // Admin can set: e.g. must payback within 30 days
  const discountRate = 0.05; // 5% discount

  // Simulate: has client accessed 100% within required days?
  const hasAccessedAllInTime = drawnAmount === originalLimit; // Replace with real logic
  // Simulate: has client paid off 50%? (for credit increase notification)
  const paidOffAmount = 6000; // Example: amount paid back
  const isEligibleForCreditIncrease = paidOffAmount >= originalLimit * 0.5;

  // Discount calculation
  const estimatedDiscount = hasAccessedAllInTime ? drawnAmount * discountRate : 0;

  const handleRequest = () => {
    setRequested(true);
    // Here you can add logic to notify admin or trigger API
  };

  const discountTerms = [
    `Access 100% of your funds within ${accessedWithinDays} days and pay back full within ${paybackWithinDays} days - Get ${(discountRate * 100).toFixed(0)}% discount`
  ];

  return (
    <div className="container mt-3  p-3">
      <h2 className="page-heading">Early Payoff Discount</h2>
      {/* Discount Term Notice */}
      <Card className="mb-5 card-green border-0">
        <Card.Body>
          <h5 className="fw-bold mb-4">Early Payback Discount Offers</h5>
          <ul className="mb-0">
               Access 100% of your funds within 10 days and pay back full within 30 days - Get ${(discountRate * 100).toFixed(0)}% discount
          </ul>
        </Card.Body>
      </Card>

      <div className="card shadow-sm border-0 card-green">
        <div className="card-body">
          {/* Show discount only if 100% accessed within required days */}
          {hasAccessedAllInTime ? (
            !requested ? (
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
            )
          ) : (
            <div className="alert alert-warning mb-0">
              You are eligible for an early payoff discount only after you have accessed 100% of your funds within {accessedWithinDays} days and pay back full within {paybackWithinDays} days.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EarlyPayoffDiscount;
