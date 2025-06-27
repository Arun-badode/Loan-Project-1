import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Tab, Nav, Table, Modal, Form } from 'react-bootstrap';

const FundRequest = () => {
  const [activeTab, setActiveTab] = useState('all'); // Default to 'all'
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Sample data for fund requests
  const requests = [
    {
      id: 'FR-2025-0001',
      customer: 'Acme Corporation',
      amount: 250000,
      date: '2025-06-20',
      purpose: 'Working capital for Q3 expansion',
      status: 'pending',
      documents: ['financial_statement.pdf', 'business_plan.pdf']
    },
    {
      id: 'FR-2025-0002',
      customer: 'TechSolutions Inc',
      amount: 500000,
      date: '2025-06-22',
      purpose: 'Equipment purchase for new office',
      status: 'approved',
      documents: ['financials_q2.pdf']
    },
    {
      id: 'FR-2025-0003',
      customer: 'Global Ventures',
      amount: 750000,
      date: '2025-06-23',
      purpose: 'Market expansion funding',
      status: 'declined',
      documents: ['market_analysis.pdf', 'expansion_plan.pdf']
    },
    {
      id: 'FR-2025-0004',
      customer: 'Innovate Partners',
      amount: 300000,
      date: '2025-06-24',
      purpose: 'Product development funding',
      status: 'pending',
      documents: ['product_roadmap.pdf']
    },
    {
      id: 'FR-2025-0005',
      customer: 'Sunrise Enterprises',
      amount: 425000,
      date: '2025-06-25',
      purpose: 'Inventory purchase',
      status: 'pending',
      documents: ['inventory_list.xlsx']
    }
  ];

  const filteredRequests = activeTab === 'all' 
    ? requests 
    : requests.filter(request => request.status === activeTab);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': 
        return <span className="badge bg-warning text-dark">Pending</span>;
      case 'approved': 
        return <span className="badge bg-success">Approved</span>;
      case 'declined': 
        return <span className="badge bg-danger">Declined</span>;
      default: 
        return <span className="badge bg-secondary">Unknown</span>;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleView = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleApprove = (id) => {
    alert(`Request ${id} approved`);
  };

  const handleDecline = (id) => {
    alert(`Request ${id} declined`);
  };

  return (
    <Container className="py-4 min-vh-100">
      {/* Page Header */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h1 className="page-heading">Funding Requests</h1>
            <p className="page-subheading">Review and manage customer funding requests</p>
          </div>
          <div className="d-flex gap-2">
            <Button variant="outline-success" className="d-flex align-items-center">
              <i className="fas fa-download me-2"></i>
              Export
            </Button>
            {/* <Button variant="success" className="d-flex align-items-center">
              <i className="fas fa-filter me-2"></i>
              Filters
            </Button> */}
          </div>
        </div>
        <hr className="my-4" />
      </div>

      {/* Request Status Tabs */}
      <Nav
        variant="pills"
        className="d-flex flex-nowrap overflow-auto mb-4 bg-white p-2 shadow-sm rounded-pill"
        style={{ whiteSpace: 'nowrap', gap: '0.5rem' }}
        activeKey={activeTab}
        onSelect={(selectedKey) => setActiveTab(selectedKey)}
      >
        {/* All Requests */}
        <Nav.Item>
          <Nav.Link
            eventKey="all"
            className={`rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center ${
              activeTab === "all"
                ? "bg-success text-white"
                : "text-success border border-success"
            }`}
          >
            <i className="fas fa-list me-2"></i>
            All Requests
            <span className="badge bg-white text-success ms-2">
              {requests.length}
            </span>
          </Nav.Link>
        </Nav.Item>

        {/* Pending Requests */}
        <Nav.Item>
          <Nav.Link
            eventKey="pending"
            className={`rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center ${
              activeTab === "pending"
                ? "bg-success text-white"
                : "text-success border border-success"
            }`}
          >
            <i className="fas fa-clock me-2"></i>
            Pending
            <span className="badge bg-white text-success ms-2">
              {requests.filter((r) => r.status === "pending").length}
            </span>
          </Nav.Link>
        </Nav.Item>

        {/* Approved */}
        <Nav.Item>
          <Nav.Link
            eventKey="approved"
            className={`rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center ${
              activeTab === "approved"
                ? "bg-success text-white"
                : "text-success border border-success"
            }`}
          >
            <i className="fas fa-check-circle me-2"></i>
            Approved
            <span className="badge bg-white text-success ms-2">
              {requests.filter((r) => r.status === "approved").length}
            </span>
          </Nav.Link>
        </Nav.Item>

        {/* Declined */}
        <Nav.Item>
          <Nav.Link
            eventKey="declined"
            className={`rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center ${
              activeTab === "declined"
                ? "bg-success text-white"
                : "text-success border border-success"
            }`}
          >
            <i className="fas fa-times-circle me-2"></i>
            Declined
            <span className="badge bg-white text-success ms-2">
              {requests.filter((r) => r.status === "declined").length}
            </span>
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Requests Table */}
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0 table-green">
              <thead className="table-light">
                <tr>
                  <th>Request ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Request Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.id}</td>
                      <td className="fw-semibold">{request.customer}</td>
                      <td>{formatCurrency(request.amount)}</td>
                      <td>{formatDate(request.date)}</td>
                      <td>{getStatusBadge(request.status)}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button 
                            variant="outline-success" 
                            size="sm"
                            onClick={() => handleView(request)}
                          >
                            <i className="fas fa-eye me-1"></i> View
                          </Button>
                          {request.status === 'pending' && (
                            <>
                              <Button 
                                variant="success" 
                                size="sm"
                                onClick={() => handleApprove(request.id)}
                              >
                                <i className="fas fa-check me-1"></i> Approve
                              </Button>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => handleDecline(request.id)}
                              >
                                <i className="fas fa-times me-1"></i> Decline
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      <div className="mx-auto mb-3 text-muted">
                        <i className="fas fa-folder-open fa-3x opacity-25"></i>
                      </div>
                      <h4 className="h5 fw-bold mb-2">No requests found</h4>
                      <p className="text-muted">There are no requests matching your criteria.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* View Request Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Request Details - {selectedRequest?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <div className="row">
              <div className="col-md-6">
                <h6 className="fw-bold mb-3">Request Information</h6>
                <div className="mb-3">
                  <p className="mb-1 text-muted">Customer</p>
                  <p className="fw-semibold">{selectedRequest.customer}</p>
                </div>
                <div className="mb-3">
                  <p className="mb-1 text-muted">Request Date</p>
                  <p className="fw-semibold">{formatDate(selectedRequest.date)}</p>
                </div>
                <div className="mb-3">
                  <p className="mb-1 text-muted">Amount</p>
                  <p className="fw-semibold">{formatCurrency(selectedRequest.amount)}</p>
                </div>
                <div className="mb-3">
                  <p className="mb-1 text-muted">Status</p>
                  <p>{getStatusBadge(selectedRequest.status)}</p>
                </div>
              </div>
              <div className="col-md-6">
                <h6 className="fw-bold mb-3">Purpose</h6>
                <p>{selectedRequest.purpose}</p>
                
                <h6 className="fw-bold mt-4 mb-3">Supporting Documents</h6>
                {selectedRequest.documents.length > 0 ? (
                  <div className="d-flex flex-wrap gap-2">
                    {selectedRequest.documents.map((doc, index) => (
                      <Button 
                        key={index} 
                        variant="outline-success" 
                        size="sm"
                        className="d-flex align-items-center"
                      >
                        <i className="fas fa-file-pdf text-danger me-2"></i>
                        {doc}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">No documents attached</p>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          {selectedRequest?.status === 'pending' && (
            <>
              <Button variant="danger" onClick={() => handleDecline(selectedRequest.id)}>
                Decline Request
              </Button>
              <Button variant="success" onClick={() => handleApprove(selectedRequest.id)}>
                Approve Request
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FundRequest;