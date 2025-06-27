import React, { useState } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';

const DocumentsModal = ({ show, handleClose, customer }) => {
  const [requestMessage, setRequestMessage] = useState('');

  if (!customer) return null;

  const handleRequestDocuments = () => {
    alert(`Document request sent to ${customer.name}: ${requestMessage}`);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" className="modal-green">
      <Modal.Header closeButton>
        <Modal.Title>Documents - {customer.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {customer.documents.length > 0 ? (
          <>
            <h6 className="fw-bold mb-3">Uploaded Documents</h6>
            <ListGroup className="mb-4">
              {customer.documents.map((doc, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                  <span>
                    <i className="fas fa-file-pdf text-danger me-2"></i>
                    {doc}
                  </span>
                  <Button variant="outline-success" size="sm">
                    <i className="fas fa-download"></i>
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        ) : (
          <div className="alert alert-warning">
            No documents uploaded for this customer.
          </div>
        )}

        <h6 className="fw-bold mb-3">Request Additional Documents</h6>
        <Form.Group>
          <Form.Label>Request Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={requestMessage}
            onChange={(e) => setRequestMessage(e.target.value)}
            placeholder="Specify which documents you need from the customer..."
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleRequestDocuments}>
          Send Request
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DocumentsModal;