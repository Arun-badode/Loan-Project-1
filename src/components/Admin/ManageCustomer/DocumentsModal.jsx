import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axiosInstance from '../../../utils/axiosInstance';
import BASE_URL from '../../../utils/baseURL';

const VerifyCustomerModal = ({ show, handleClose, customer, refreshCustomers }) => {
  const [einNumber, setEinNumber] = useState("");

  useEffect(() => {
    if (customer?.einNumber) {
      setEinNumber(customer.einNumber);
    }
  }, [customer]);

  const handleVerify = async () => {
    try {
      await axiosInstance.put(`${BASE_URL}/updateCustumer/${customer._id}`, {
        einNumber: einNumber
      });

      alert(`✅ EIN Number updated successfully for "${customer.customerName}".`);
      handleClose();
      if (refreshCustomers) refreshCustomers();
    } catch (error) {
      console.error("❌ Error updating EIN:", error);
      alert("❌ Failed to update EIN number.");
    }
  };

  if (!customer) return null;

  return (
    <Modal show={show} onHide={handleClose} centered size="md" className="modal-green">
      <Modal.Header closeButton>
        <Modal.Title>Update Account Number - {customer.customerName}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Account Number</Form.Label>
          <Form.Control
            type="text"
            value={einNumber}
            onChange={(e) => setEinNumber(e.target.value)}
            placeholder="Enter EIN Number"
            maxLength={9}
            required
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleVerify}>
       Update Account Number
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VerifyCustomerModal;
