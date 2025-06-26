import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

const EditCreditLineModal = ({ show, handleClose }) => {
  const [newAmount, setNewAmount] = useState('75000');
  const [reason, setReason] = useState('limit_increase');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Updated credit line to $${newAmount} for reason: ${reason}`);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="fw-semibold">Edit Credit Line - John Smith</Modal.Title>
        <Button variant="link" className="ms-auto text-decoration-none text-primary" onClick={handleClose}>
          <i className="fas fa-arrow-left me-1"></i> Back
        </Button>
      </Modal.Header>

      <Modal.Body>
        <div className="bg-light p-3 rounded text-primary fw-semibold mb-4">
          Current Credit Line: <span className="text-dark">$50,000</span>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="newAmount" className="mb-3">
            <Form.Label>New Credit Line</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Enter new amount"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="reason" className="mb-4">
            <Form.Label>Reason</Form.Label>
            <Form.Select value={reason} onChange={(e) => setReason(e.target.value)} required>
              <option value="">Select a reason</option>
              <option value="limit_increase">Limit Increase</option>
              <option value="limit_decrease">Limit Decrease</option>
              <option value="performance_review">Performance Review</option>
              <option value="customer_request">Customer Request</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Update Credit Line
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditCreditLineModal;
