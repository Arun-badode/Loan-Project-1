import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axiosInstance from '../../../utils/axiosInstance';
import BASE_URL from '../../../utils/baseURL';

const VerifyCustomerModal = ({ show, handleClose, customer,refreshCustomers  }) => {
  if (!customer) return null;

  const handleVerify = async () => {
    try {
      await axiosInstance.patch(
        `${BASE_URL}/updatecustomerstatus/${customer._id}`,
        { customerStatus: "active" }
      );
      alert(`✅ Customer "${customer.customerName}" has been verified.`);
      handleClose();
        if (refreshCustomers) refreshCustomers();
    } catch (error) {
      console.error("❌ Error verifying customer:", error);
      alert("❌ Failed to verify customer.");
    }
  };

  const renderDocument = (label, url) => (
    <div className="mb-3">
      <strong>{label}:</strong><br />
      {url ? (
        <img
          src={url}
          alt={`${label}`}
          style={{ maxWidth: "100%", maxHeight: "250px", borderRadius: "8px", border: "1px solid #ccc" }}
        />
      ) : (
        <div className="text-danger">No document available</div>
      )}
    </div>
  );

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" backdrop="static" className="modal-green">
      <Modal.Header closeButton>
        <Modal.Title>Verify Merchant  - {customer.customerName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderDocument("GST Document", customer.gstDoc)}
        {renderDocument("PAN Document", customer.panDoc)}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleVerify}>
          Verify
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VerifyCustomerModal;
