import React from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';

const CustomerDetailsModal = ({ show, handleClose, customer }) => {
  if (!customer) return null;
 console.log(customer)

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static" className="modal-green">
      <Modal.Header closeButton>
        <Modal.Title>Merchant Details - {customer.customerName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <div className="p-3 bg-light rounded mb-3">
              <h6 className="fw-bold mb-3">Basic Information</h6>
              <p className="mb-2"><strong>Name:</strong> {customer.customerName}</p>
              <p className="mb-2"><strong>Company:</strong> {customer.companyName}</p>
              <p className="mb-2"><strong>Email:</strong> {customer.email}</p>
              <p className="mb-0"><strong>Phone:</strong> {customer.phoneNumber}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 bg-light rounded mb-3">
              <h6 className="fw-bold mb-3">Credit Information</h6>
              <p className="mb-2"><strong>Approved Limit:</strong> ${customer.approvedAmount}</p>
              <p className="mb-2"><strong>Factor Rate:</strong> {customer.factorRate} </p>
              <p className="mb-2"><strong>Term type:</strong> {customer.term_type} </p>
              <p className="mb-2"><strong>Payment:</strong> ${customer.installment} </p>
              <p className="mb-2"><strong>Current Balance:</strong>$ {customer.availBalance}</p>
              <p className="mb-2"><strong>total Payback :</strong> ${customer.remainingRepayment}</p>
              <p className="mb-0">
                <strong>Status:</strong>{" "}
                <span className={`badge text-capitalize fw-semibold px-3 py-1 
                   ${customer.customerStatus === "active" ? "bg-success" :
                    customer.customerStatus === "disqualified" ? "bg-danger" :  "bg-warning text-dark"}`}> {customer.customerStatus} </span>
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomerDetailsModal;