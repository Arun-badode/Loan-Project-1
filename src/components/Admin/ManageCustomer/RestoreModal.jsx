
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import BASE_URL from '../../../utils/baseURL';
import axiosInstance from '../../../utils/axiosInstance';

const RestoreModal = ({ show, handleClose, customer ,refreshCustomers }) => {
  if (!customer) return null; 

  const handleDisqualify = async () => {
    try {
      const response = await axiosInstance.patch(
        `${BASE_URL}/updatecustomerstatus/${customer._id}`,
        { customerStatus: "Active" }
      );

      alert(`✅ Merchant  "${customer.customerName}" has been Unsuspend.`);
      handleClose();
       if (refreshCustomers) refreshCustomers();
    } catch (error) {
      console.error("❌ Error disqualifying customer:", error);
      alert("❌ Failed to disqualify customer. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered  className="modal-green">
      <Modal.Header closeButton>
        <Modal.Title>Unsuspend Merchant   - {customer.customerName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-primary">
          <i className="fas fa-exclamation-triangle me-2"></i>
          Are you sure you want to Unsuspend  this Merchant ? 
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleDisqualify}>
        Unsuspend Merchant 
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RestoreModal;

