import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Tab, Nav, Table, Modal, Form } from 'react-bootstrap';
const EarlyPayoffDiscount = () => {
  const [requested, setRequested] = useState(false);
  const [drawnAmount, setDrawnAmount] = useState(10000); // Example amount
  const discountRate = 0.05; // 5%

  const estimatedDiscount = drawnAmount * discountRate;

  const handleRequest = () => {
    setRequested(true);
    // Here you can add logic to notify admin or trigger API
  };
  const discountTerms = [
    "Access 100% of your funds within XX days and pay back full within XX days - Get 10% discount",
    "Access 100% of your funds within XX days and pay back full within XX days - Get 5% discount"
  ];
  return (
    <div className="container mt-3  p-3">
      <h2 className="page-heading">Early Payoff Discount</h2>
        {/* Discount Term Notice */}
      <Card className="mb-5 card-green border-0">
        <Card.Body>
          <h5 className="fw-bold mb-4">Early Payback Discount Offers</h5>
          <ul className="mb-0">
            {discountTerms.map((term, index) => (
              <li key={index}>{term}</li>
            ))}
          </ul>
        </Card.Body>
      </Card>

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
