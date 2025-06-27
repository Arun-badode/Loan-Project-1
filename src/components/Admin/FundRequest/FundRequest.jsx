import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Tab, Nav, Alert, Modal, Form } from 'react-bootstrap';

const FundRequest = () => {
  const [activeTab, setActiveTab] = useState('new');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState({
    status: '',
    comments: ''
  });

  // Sample data for fund requests
  const requests = [
    {
      id: 'FR-2025-0001',
      requester: 'John Smith',
      amount: 2500.00,
      date: '2025-06-20',
      description: 'Marketing campaign for Q3 product launch',
      status: 'new'
    },
    {
      id: 'FR-2025-0002',
      requester: 'Emily Johnson',
      amount: 1200.00,
      date: '2025-06-22',
      description: 'Travel expenses for client meeting in New York',
      status: 'new'
    },
    {
      id: 'FR-2025-0003',
      requester: 'Michael Chen',
      amount: 3750.00,
      date: '2025-06-23',
      description: 'Equipment purchase for development team',
      status: 'in-progress'
    },
    {
      id: 'FR-2025-0004',
      requester: 'Sarah Williams',
      amount: 950.00,
      date: '2025-06-24',
      description: 'Software licenses renewal for design department',
      status: 'completed'
    }
  ];

  const filteredRequests = requests.filter(request => {
    if (activeTab === 'new') return request.status === 'new';
    if (activeTab === 'in-progress') return request.status === 'in-progress';
    if (activeTab === 'completed') return request.status === 'completed';
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-success';
      case 'in-progress': return 'bg-success';
      case 'completed': return 'bg-success';
      default: return 'bg-secondary';
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
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="py-4 min-vh-100">
      <Container>
        {/* Page Header */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h1 className="page-heading">Fund Requests</h1>
              <p className="page-subheading">Manage and process funding requests across the organization</p>
            </div>
            <Button variant="success" onClick={() => setIsModalOpen(true)} className="d-flex align-items-center">
              <i className="fas fa-plus me-2"></i>
              New Request
            </Button>
          </div>
          <hr className="my-4" />
        </div>

        {/* Request Status Tabs */}
        <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
         <Nav
  variant="pills"
  className="d-flex flex-nowrap overflow-auto mb-4 bg-white p-2 shadow-sm rounded-pill"
  style={{ whiteSpace: 'nowrap', gap: '0.5rem' }}
  activeKey={activeTab}
  onSelect={(selectedKey) => setActiveTab(selectedKey)}
>
  {/* New Requests */}
  <Nav.Item>
    <Nav.Link
      eventKey="new"
      className={`rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center ${
        activeTab === "new"
          ? "bg-success text-white"
          : "text-success border border-success"
      }`}
    >
      <i className="fas fa-file-alt me-2"></i>
      New Requests
      <span className="badge bg-white text-success ms-2">
        {requests.filter((r) => r.status === "new").length}
      </span>
    </Nav.Link>
  </Nav.Item>

  {/* In Progress */}
  <Nav.Item>
    <Nav.Link
      eventKey="in-progress"
      className={`rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center ${
        activeTab === "in-progress"
          ? "bg-success text-white"
          : "text-success border border-success"
      }`}
    >
      <i className="fas fa-spinner me-2"></i>
      In Progress
      <span className="badge bg-white text-success ms-2">
        {requests.filter((r) => r.status === "in-progress").length}
      </span>
    </Nav.Link>
  </Nav.Item>

  {/* Completed */}
  <Nav.Item>
    <Nav.Link
      eventKey="completed"
      className={`rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center ${
        activeTab === "completed"
          ? "bg-success text-white"
          : "text-success border border-success"
      }`}
    >
      <i className="fas fa-check-circle me-2"></i>
      Completed
      <span className="badge bg-white text-success ms-2">
        {requests.filter((r) => r.status === "completed").length}
      </span>
    </Nav.Link>
  </Nav.Item>
</Nav>



          {/* Request List Container */}
          <Tab.Content>
            {filteredRequests.length > 0 ? (
              <Row xs={1} md={2} lg={3} className="g-4">
                {filteredRequests.map((request) => (
                  <Col key={request.id}>
                    <Card className="h-100 border-0 shadow-sm">
                      <Card.Body className="p-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div>
                            <Card.Title className="fw-bold text-dark">{request.id}</Card.Title>
                            <Card.Subtitle className="text-muted small">
                              Submitted on {formatDate(request.date)}
                            </Card.Subtitle>
                          </div>
                          <span className={`badge ${getStatusColor(request.status)} text-capitalize rounded-pill px-3 py-2`}>
                            {request.status.replace('-', ' ')}
                          </span>
                        </div>

                        <div className="mb-4">
                          <div className="d-flex align-items-center mb-3">
                            <div className=" bg-opacity-10 rounded-circle p-2 me-3">
                              <i className="fas fa-user text-success"></i>
                            </div>
                            <div>
                              <p className="mb-0 small text-muted">Requester</p>
                              <p className="mb-0 fw-semibold">{request.requester}</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <div className=" bg-opacity-10 rounded-circle p-2 me-3">
                              <i className="fas fa-money-bill-wave text-success"></i>
                            </div>
                            <div>
                              <p className="mb-0 small text-muted">Amount</p>
                              <p className="mb-0 fw-semibold">{formatCurrency(request.amount)}</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-start">
                            <div className=" bg-opacity-10 rounded-circle p-2 me-3">
                              <i className="fas fa-align-left text-success"></i>
                            </div>
                            <div>
                              <p className="mb-0 small text-muted">Description</p>
                              <p className="mb-0">{request.description}</p>
                            </div>
                          </div>
                        </div>

                        <div className="d-grid gap-3">
                          {request.status === 'new' && (
                            <div className="d-grid gap-2 d-md-flex">
                              <Button variant="success" className="me-md-2 rounded-pill px-4">
                                <i className="fas fa-check me-2"></i> Approve
                              </Button>
                              <Button variant="outline-danger" className="rounded-pill px-4">
                                <i className="fas fa-times me-2"></i> Reject
                              </Button>
                            </div>
                          )}
                          <Button
                            variant="outline-success"
                            className="rounded-pill px-4"
                            onClick={() => {
                              setSelectedRequest(request.id);
                              setStatusUpdate({ status: request.status, comments: '' });
                              setIsModalOpen(true);
                            }}
                          >
                            <i className="fas fa-edit me-2"></i> Update Status
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <Card className="text-center p-5 border-0 shadow-sm">
                <Card.Body>
                  <div className="mx-auto mb-4 text-muted">
                    <i className="fas fa-folder-open fa-4x opacity-25"></i>
                  </div>
                  <h3 className="h5 fw-bold mb-3">No fund requests available</h3>
                  <p className="text-muted mb-4">There are no requests in this category at the moment.</p>
                  <Button variant="success" className="rounded-pill px-4 py-2">
                    <i className="fas fa-plus me-2"></i>
                    Create New Request
                  </Button>
                </Card.Body>
              </Card>
            )}
          </Tab.Content>
        </Tab.Container>
      </Container>

      {/* Status Update Modal */}
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} centered className='modal-green'>
        <Modal.Header closeButton className="border-0 pb-0 ">
          <Modal.Title className="fw-bold">Update Request Status</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <Form>
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold mb-3">New Status</Form.Label>
              <div className="d-flex flex-column gap-3">
                {['new', 'in-progress', 'completed'].map((status) => (
                  <Form.Check
                    key={status}
                    type="radio"
                    id={`status-${status}`}
                    name="status"
                    label={status.replace('-', ' ')}
                    value={status}
                    checked={statusUpdate.status === status}
                    onChange={(e) => setStatusUpdate({
                      ...statusUpdate,
                      status: e.target.value
                    })}
                    className="rounded-pill p-3 border"
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label className="fw-semibold">Comments</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Add any notes about this status change..."
                value={statusUpdate.comments}
                onChange={(e) => setStatusUpdate({
                  ...statusUpdate,
                  comments: e.target.value
                })}
                className="border-2"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="outline-secondary" onClick={() => setIsModalOpen(false)} className="rounded-pill px-4">
            Cancel
          </Button>
          <Button variant="success" onClick={() => setIsModalOpen(false)} className="rounded-pill px-4">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FundRequest;