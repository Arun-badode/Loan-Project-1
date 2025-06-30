import React from 'react';
import { Modal, Button, Badge, Table } from 'react-bootstrap';

const CustomerDetailsModal = ({ show, handleClose, customer }) => {
  if (!customer) return null;

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null || isNaN(amount)) return "-";
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    }).format(amount);
  };

  // Fallbacks for missing fields
  const safe = (val) => (val !== undefined && val !== null && val !== "" ? val : "-");

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static" className="modal-green">
      <Modal.Header closeButton>
        <Modal.Title>Customer Details - {safe(customer.name)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-12">
            <Table bordered hover responsive>
              <tbody>
                <tr>
                  <th>Customer ID</th>
                  <td>{safe(customer.id)}</td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>{safe(customer.name)}</td>
                </tr>
                <tr>
                  <th>Company</th>
                  <td>{safe(customer.company)}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{safe(customer.email)}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>{safe(customer.phone)}</td>
                </tr>
                <tr>
                  <th>Approved Limit</th>
                  <td>
                    {formatCurrency(customer.approvedLimit ?? customer.creditLine)}
                  </td>
                </tr>
                <tr>
                  <th>Factor Rate</th>
                  <td>{safe(customer.factorRate)}</td>
                </tr>
                <tr>
                  <th>Term</th>
                  <td>{safe(customer.term)}</td>
                </tr>
                <tr>
                  <th>Current Balance</th>
                  <td>
                    {formatCurrency(customer.currentBalance ?? customer.balance)}
                  </td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>
                    <Badge bg={
                      customer.status === 'Active'
                        ? 'success'
                        : customer.status === 'Disqualified'
                        ? 'danger'
                        : 'warning'
                    }>
                      {safe(customer.status)}
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <th>Documents</th>
                  <td>
                    {Array.isArray(customer.documents) && customer.documents.length > 0
                      ? customer.documents.map((doc, idx) => (
                          <Badge bg="light" text="dark" className="me-1" key={idx}>{doc}</Badge>
                        ))
                      : "-"}
                  </td>
                </tr>
              </tbody>
            </Table>
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