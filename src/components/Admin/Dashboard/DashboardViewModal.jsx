import React from "react";
import { Modal, Button } from "react-bootstrap";

const DashboardViewModal = ({ show, handleClose, request }) => {
  if (!request) return null;

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" className="modal-green">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Funding Request Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Request & Applicant Info */}
        <div className="row mb-3">
          {/* Request Information */}
          <div className="col-md-6">
            <h6 className="fw-bold">Request Information</h6>
            <p className="mb-1"><strong>Request ID:</strong> {request.id}</p>
            <p className="mb-1"><strong>Customer:</strong> {request.customer}</p>
            <p className="mb-1"><strong>Amount:</strong> {request.amount}</p>
            <p className="mb-1"><strong>Date:</strong> {request.date}</p>
            <p className="mb-1">
              <strong>Status:</strong>{" "}
              <span className={`badge ${
                request.status === "Approved" ? "bg-success" :
                request.status === "Pending" ? "bg-warning text-dark" : "bg-danger"
              }`}>
                {request.status}
              </span>
            </p>
          </div>

          {/* Applicant Information */}
          <div className="col-md-6">
            <h6 className="fw-bold">Applicant Information</h6>
            <p className="mb-1"><strong>Total Credit Allowed:</strong> $100</p>
            <p className="mb-1"><strong>Remaining Balance:</strong> $100</p>
            <p className="mb-1"><strong>Previously Distributed Funds :</strong> $100</p>
            <p className="mb-1"><strong>Years in Business:</strong> 6 years</p>
          </div>
        </div>
        {/* Approval History */}
      </Modal.Body>

      {/* Footer Buttons */}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" disabled={request.status === "Rejected"}>
          Reject
        </Button>
        <Button variant="success" disabled={request.status === "Approved"}>
          Approve
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DashboardViewModal;