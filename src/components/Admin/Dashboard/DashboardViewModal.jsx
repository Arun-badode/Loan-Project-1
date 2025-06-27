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
            <p className="mb-1"><strong>Company Type:</strong> Corporation</p>
            <p className="mb-1"><strong>Industry:</strong> Technology</p>
            <p className="mb-1"><strong>Annual Revenue:</strong> $20M - $50M</p>
            <p className="mb-1"><strong>Years in Business:</strong> 6 years</p>
          </div>
        </div>

        {/* Request Purpose */}
        <div className="mb-3">
          <h6 className="fw-bold">Request Purpose</h6>
          <p className="text-muted small">
            Working capital for expansion into new markets and inventory
            management. The funds will be used to support operations in the Asia-Pacific
            region and strengthen the supply chain infrastructure.
          </p>
        </div>

        {/* Supporting Documents */}
        <div className="mb-3">
          <h6 className="fw-bold">Supporting Documents</h6>
          <div className="row g-2">
            {[
              { label: "Financial Statements.pdf", icon: "fas fa-file-pdf text-danger" },
              { label: "Business Plan.xlsx", icon: "fas fa-file-excel text-success" },
              { label: "Company Profile.docx", icon: "fas fa-file-word text-primary" },
            ].map((doc, idx) => (
              <div className="col-md-6" key={idx}>
                <div className="border rounded p-2 bg-light d-flex align-items-center">
                  <i className={`${doc.icon} me-2`}></i>
                  <span className="text-truncate small">{doc.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Approval History */}
        <div>
          <h6 className="fw-bold">Approval History</h6>
          <ul className="list-unstyled small mb-2">
            {request.status === "Pending" ? (
              <li>No approval actions yet</li>
            ) : (
              <>
                <li className="mb-1">
                  <strong>Jun 25, 2025:</strong> Initial Review by John Smith
                </li>
                <li>
                  <strong>Final Decision:</strong> {request.status} by Admin User
                </li>
              </>
            )}
          </ul>
        </div>
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