import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';

const CustomerDetailsModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Customer Details</Modal.Title>
        <Button
          variant="link"
          className="ms-auto text-decoration-none"
          onClick={handleClose}
        >
          Back to List
        </Button>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col md={6}>
            <div className="p-3 bg-light rounded">
              <h6 className="fw-bold mb-3">Basic Information</h6>
              <p className="mb-2"><strong>Customer Name</strong><br />John Smith</p>
              <p className="mb-2"><strong>Company</strong><br />Smith Enterprises</p>
              <p className="mb-2"><strong>Email</strong><br />john.smith@example.com</p>
              <p className="mb-0"><strong>Phone</strong><br />+1 (555) 123-4567</p>
            </div>
          </Col>

          <Col md={6}>
            <div className="p-3 bg-light rounded">
              <h6 className="fw-bold mb-3">Credit Information</h6>
              <p className="mb-2"><strong>Credit Line</strong><br /><span className="text-Success">$50,000</span></p>
              <p className="mb-2"><strong>Current Balance</strong><br />$12,500</p>
              <p className="mb-0"><strong>Status</strong><br /><span className="badge bg-success">Active</span></p>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default CustomerDetailsModal;
