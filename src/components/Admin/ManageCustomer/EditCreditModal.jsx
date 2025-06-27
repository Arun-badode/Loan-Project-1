import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

const EditCreditModal = ({ show, handleClose, customer }) => {
  const [formData, setFormData] = useState({
    creditLine: customer?.creditLine || '',
    factorRate: customer?.factorRate || '',
    term: customer?.term || '',
    reason: ''
  });

  if (!customer) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Updated credit details for ${customer.name}`);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" className="modal-green">
      <Modal.Header closeButton>
        <Modal.Title>Update Credit Terms - {customer.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Credit Limit</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                name="creditLine"
                type="number"
                value={formData.creditLine}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Factor Rate</Form.Label>
            <Form.Control
              name="factorRate"
              type="number"
              step="0.01"
              min="1.0"
              value={formData.factorRate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Term (months)</Form.Label>
            <Form.Control
              name="term"
              type="number"
              value={formData.term}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Reason for Change</Form.Label>
            <Form.Control
              name="reason"
              as="textarea"
              rows={2}
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Update Terms
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditCreditModal;