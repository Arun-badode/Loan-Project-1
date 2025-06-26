import React from "react";
import { Modal, Button } from "react-bootstrap";



const DashboardViewModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Fund Request Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Request & Applicant Info */}
        <div className="row mb-3">
          {/* Request Information */}
          <div className="col-md-6">
            <h6 className="fw-bold">Request Information</h6>
            <p className="mb-1"><strong>Request ID:</strong> REQ-2025-06-26-001</p>
            <p className="mb-1"><strong>Customer:</strong> Acme Corp</p>
            <p className="mb-1"><strong>Amount:</strong> $250,000</p>
            <p className="mb-1"><strong>Date:</strong> 2025-06-26</p>
            <p className="mb-1">
              <strong>Status:</strong>{" "}
              <span className="badge bg-warning text-dark">Pending</span>
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
              { label: "Additional Document.zip", icon: "fas fa-file-archive text-secondary" },
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
            <li className="mb-1">
              <strong>Jun 25, 2025:</strong> Initial Review by John Smith
            </li>
            <li>
              <strong>Risk Assessment:</strong> In Progress
            </li>
          </ul>
        </div>
      </Modal.Body>

      {/* Footer Buttons */}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger">Reject</Button>
        <Button variant="success">Approve</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DashboardViewModal;
