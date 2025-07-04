import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import BASE_URL from '../../../utils/baseURL';
import axiosInstance from '../../../utils/axiosInstance';

const DisqualifyModal = ({ show, handleClose, customer ,refreshCustomers }) => {
  if (!customer) return null; 

  const handleDisqualify = async () => {
    try {
      const response = await axiosInstance.patch(
        `${BASE_URL}/updatecustomerstatus/${customer._id}`,
        { customerStatus: "Suspended" }
      );

      alert(`✅ Customer "${customer.customerName}" has been disqualified.`);
      handleClose();
       if (refreshCustomers) refreshCustomers();
    } catch (error) {
      console.error("❌ Error disqualifying customer:", error);
      alert("❌ Failed to disqualify customer. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" className="modal-green">
      <Modal.Header closeButton>
        <Modal.Title>Suspend Customer  - {customer.customerName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-danger">
          <i className="fas fa-exclamation-triangle me-2"></i>
          Are you sure you want to Suspend  this customer? 
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDisqualify}>
        Suspend Customer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DisqualifyModal;
