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
      case 'new': return 'bg-primary';
      case 'in-progress': return 'bg-warning';
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
          <h1 className="page-heading">Fund Requests</h1>
          <p className="page-subheading">Manage and process funding requests across the organization</p>
        </div>

        {/* Request Status Tabs */}
        <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Nav variant="tabs" className="mb-4">
            <Nav.Item>
              <Nav.Link eventKey="new">
                <i className="fas fa-file-alt me-2"></i>
                New Requests
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="in-progress">
                <i className="fas fa-spinner me-2"></i>
                In Progress
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="completed">
                <i className="fas fa-check-circle me-2"></i>
                Completed
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {/* Request List Container */}
          <Tab.Content>
            {filteredRequests.length > 0 ? (
              <Row xs={1} md={2} lg={3} className="g-4">
                {filteredRequests.map((request) => (
                  <Col key={request.id}>
                    <Card className="h-100 card-green">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div>
                            <Card.Title>{request.id}</Card.Title>
                            <Card.Subtitle className="text-muted small">
                              Submitted on {formatDate(request.date)}
                            </Card.Subtitle>
                          </div>
                          <span className={`badge ${getStatusColor(request.status)} text-capitalize`}>
                            {request.status.replace('-', ' ')}
                          </span>
                        </div>

                        <div className="mb-3">
                          <div className="d-flex align-items-center mb-2">
                            <i className="fas fa-user text-muted me-2"></i>
                            <span className="fw-medium">{request.requester}</span>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <i className="fas fa-money-bill-wave text-muted me-2"></i>
                            <span className="fw-medium">{formatCurrency(request.amount)}</span>
                          </div>
                          <div className="d-flex align-items-start">
                            <i className="fas fa-align-left text-muted me-2 mt-1"></i>
                            <span className="text-muted">{request.description}</span>
                          </div>
                        </div>

                        <div className="d-grid gap-2">
                          {request.status === 'new' && (
                            <div className="d-grid gap-2 d-md-flex">
                              <Button variant="success" className="me-md-2">
                                <i className="fas fa-check me-2"></i> Approve
                              </Button>
                              <Button variant="danger">
                                <i className="fas fa-times me-2"></i> Reject
                              </Button>
                            </div>
                          )}
                          <Button 
                            variant="outline-secondary"
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
              <Card className="text-center p-5">
                <Card.Body>
                  <div className="mx-auto mb-4 text-muted">
                    <i className="fas fa-folder-open fa-4x"></i>
                  </div>
                  <h3 className="h5 fw-bold">No fund requests available</h3>
                  <p className="text-muted">There are no requests in this category at the moment.</p>
                  <Button variant="primary" className="mt-3">
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
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-4">
              <Form.Label>New Status</Form.Label>
              <div className="d-flex flex-column gap-2">
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
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Add any notes about this status change..."
                value={statusUpdate.comments}
                onChange={(e) => setStatusUpdate({
                  ...statusUpdate,
                  comments: e.target.value
                })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setIsModalOpen(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FundRequest;