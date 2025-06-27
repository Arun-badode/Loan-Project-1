import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const DisqualifyModal = ({ show, handleClose, customer }) => {
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  if (!customer) return null;

  const handleDisqualify = () => {
    const finalReason = reason === 'other' ? otherReason : reason;
    alert(`Customer ${customer.name} has been disqualified. Reason: ${finalReason}`);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" className="modal-green">
      <Modal.Header closeButton>
        <Modal.Title>Disqualify Customer - {customer.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-danger">
          <i className="fas fa-exclamation-triangle me-2"></i>
          This action will prevent this customer from accessing any credit facilities.
        </div>

        <Form.Group>
          <Form.Label>Reason for Disqualification</Form.Label>
          <Form.Control
            as="select"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          >
            <option value="">Select a reason</option>
            <option value="poor_performance">Poor Payment Performance</option>
            <option value="fraud">Suspected Fraud</option>
            <option value="financial_distress">Financial Distress</option>
            <option value="other">Other</option>
          </Form.Control>
        </Form.Group>

        {reason === 'other' && (
          <Form.Group className="mt-3">
            <Form.Label>Please specify</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              required
            />
          </Form.Group>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDisqualify}>
          Confirm Disqualification
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DisqualifyModal;