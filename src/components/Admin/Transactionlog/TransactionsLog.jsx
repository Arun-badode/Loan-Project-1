import React, { useState } from 'react';
import { Table, Button, Modal, Form, Row, Col, Badge, InputGroup } from 'react-bootstrap';

const TransactionsLog = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const transactions = [
    {
      id: 'TXN-2025-001',
      datetime: '06/26/2025 09:30 AM',
      amount: '$5,000.00',
      type: 'Withdrawal',
      status: 'Approved',
    },
    {
      id: 'TXN-2025-002',
      datetime: '06/26/2025 10:15 AM',
      amount: '$3,200.00',
      type: 'Deposit',
      status: 'Rejected',
    },
    {
      id: 'TXN-2025-003',
      datetime: '06/26/2025 11:45 AM',
      amount: '$8,500.00',
      type: 'Withdrawal',
      status: 'Approved',
    },
    {
      id: 'TXN-2025-004',
      datetime: '06/26/2025 02:20 PM',
      amount: '$1,800.00',
      type: 'Deposit',
      status: 'Approved',
    },
    {
      id: 'TXN-2025-005',
      datetime: '06/26/2025 03:55 PM',
      amount: '$4,200.00',
      type: 'Withdrawal',
      status: 'Rejected',
    },
  ];

  const handleView = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
  switch (status) {
    case 'Approved':
      return <span className="badge-custom badge-success-soft py-1 px-1 rounded-pill">Approved</span>;
    case 'Rejected':
      return <span className="badge-custom badge-danger-soft py-1 px-1 rounded-pill">Rejected</span>;
    default:
      return <span className="badge-custom badge-warning-soft py-1 px-1 rounded-pill">{status}</span>;
  }
};


  return (
    <div className="container my-4">
      <h4 className="page-heading">Transactions Log</h4>

      {/* Compact Filters */}
   <Row className="g-2 mb-3 align-items-center">
  <Col>
    <Form.Control size="sm" type="text" placeholder="Search transactions..." className="w-100 p-2 input-green" />
  </Col>
  <Col>
    <Form.Control size="sm" type="date" className="w-100 p-2 input-green" />
  </Col>
  <Col>
    <Form.Control size="sm" type="date" className="w-100 p-2 input-green" />
  </Col>
  <Col>
    <Form.Select size="sm" className="w-100 p-2 input-green">
      <option>All</option>
      <option>Approved</option>
      <option>Rejected</option>
    </Form.Select>
  </Col>
</Row>


      {/* Transactions Table */}
      <Table responsive hover bordered className=" shadow-sm small table-green ">
        <thead className="table-light">
          <tr>
            <th>Date/Time</th>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.datetime}</td>
              <td className="text-primary">{txn.id}</td>
              <td>{txn.amount}</td>
              <td>{txn.type}</td>
              <td>{getStatusBadge(txn.status)}</td>
              <td>
              
                  <button className="btn btn-sm btn-outline-success me-2"  onClick={() => handleView(txn)}>
                        <i className="fas fa-eye me-1"></i> View
                      </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Transaction Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered className='modal-green'>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTransaction && (
            <Row>
              <Col sm={6} className="mb-3">
                <p><strong>Transaction ID</strong><br />{selectedTransaction.id}</p>
              </Col>
              <Col sm={6} className="mb-3">
                <p><strong>Date/Time</strong><br />{selectedTransaction.datetime}</p>
              </Col>
              <Col sm={6} className="mb-3">
                <p><strong>Amount</strong><br />{selectedTransaction.amount}</p>
              </Col>
              <Col sm={6} className="mb-3">
                <p><strong>Type</strong><br />{selectedTransaction.type}</p>
              </Col>
              <Col sm={12}>
                <p><strong>Status</strong><br />{getStatusBadge(selectedTransaction.status)}</p>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TransactionsLog;
