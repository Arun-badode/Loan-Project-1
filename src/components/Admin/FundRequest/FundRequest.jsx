import React, { useEffect, useState } from 'react';
import {  Container, Card, Button, Nav, Table, Modal} from 'react-bootstrap';
import axiosInstance from '../../../utils/axiosInstance';

const FundRequest = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState([]);
  // 🟢 Fetch from API on mount
  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await axiosInstance.get("/getallwithdrawpayment");
         console.log("✅ Withdrawal requests fetched:", response.data);
        const data = response.data?.result || [];
        setRequests(data);
      } catch (err) {
        console.error("❌ Error fetching withdrawals:", err);
  
      } 
    };
    fetchWithdrawals();
  }, []);

  // 🟡 Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  // 🟢 Currency formatting
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR'
    }).format(amount);
  };

  // 🔵 Filter requests
  const filteredRequests = activeTab === 'all'
    ? requests
    : requests.filter(req => req.withdrawStatus === activeTab);

  // 🔘 Badge display
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="badge bg-warning text-dark">Pending</span>;
      case 'Approved':
        return <span className="badge bg-success">Approved</span>;
      case 'declined':
        return <span className="badge bg-danger">Declined</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

const handleApprove = async (id) => {
  try {
    await axiosInstance.patch(`/withdrawstatusupdate/${id}`, {
      withdrawStatus: "Approved"
    });
    alert(`✅ Request ${id} Approved`);
    // Refresh list
    setRequests(prev =>
      prev.map(r => (r._id === id ? { ...r, withdrawStatus: "approved" } : r))
    );
  } catch (error) {
    console.error("❌ Error approving request:", error);
    alert("Failed to approve request.");
  }
};

const handleDecline = async (id) => {
  try {
    await axiosInstance.patch(`/withdrawstatusupdate/${id}`, {
      withdrawStatus: "Rejected"
    });
    alert(`❌ Request ${id} Rejected`);
    // Refresh list
    setRequests(prev =>
      prev.map(r => (r._id === id ? { ...r, withdrawStatus: "Rejected" } : r))
    );
  } catch (error) {
    console.error("❌ Error declining request:", error);
    alert("Failed to decline request.");
  }
};


  return (
    <Container className="py-4 min-vh-100">
      <div className="mb-4">
        <h2>Funding Requests</h2>
        <p className="text-muted">Manage all funding request activities here.</p>
        <hr />
      </div>

      {/* 🔵 Tabs */}
      <Nav variant="pills" className="mb-4 gap-2" activeKey={activeTab} onSelect={setActiveTab}>
        {['all', 'pending', 'Approved', 'Rejected'].map((key) => (
          <Nav.Item key={key}>
            <Nav.Link
              eventKey={key}
              className={`rounded-pill px-4 fw-semibold ${activeTab === key
                ? 'bg-success text-white'
                : 'text-success border border-success'
              }`}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
              <span className="badge bg-white text-success ms-2">
                {key === 'all' ? requests.length : requests.filter(r => r.withdrawStatus === key).length}
              </span>
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* 🟢 Table */}
      <Card className="shadow-sm border-0">
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead className="table-success">
                <tr>
                  <th>Account Number</th>
                  <th>Merchant  Name</th>
                  <th>Requested Amount </th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((req) => (
                    <tr key={req._id}>
                   <td>{req?.einNumber}</td>
                      <td>{req?.customerName}</td>
                      <td> ${req?.withdrawAmount}</td>
                     <td>
  {req.createdAt 
    ? new Date(req.createdAt).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric"
      }) 
    : "N/A"}
</td>

                      <td>{getStatusBadge(req.withdrawStatus)}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button size="sm" variant="outline-success" onClick={() => {
                            setSelectedRequest(req);
                            setShowModal(true);}}>
                            View
                          </Button>
                          {req.withdrawStatus === 'pending' && (
                            <>
                              <Button size="sm" variant="success" onClick={() => handleApprove(req._id)}>
                                Approve
                              </Button>
                              <Button size="sm" variant="outline-danger" onClick={() => handleDecline(req._id)}>
                               Reject
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
                      <div className="text-muted">No records found</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* 🔍 Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Request Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <>
             <p> <strong>Account Number:</strong>{" "} {selectedRequest?.einNumber}</p>
              <p><strong>Name:</strong> {selectedRequest.customerName}</p>
              <p><strong>Approved Amount:</strong> ${selectedRequest.approvedCreditLine}</p>
              <p><strong>Available Amount:</strong> ${selectedRequest.availableAmount}</p>
              <p><strong>Requested Amount:</strong> ${selectedRequest.withdrawAmount}</p>
              <p><strong>Status:</strong> {getStatusBadge(selectedRequest.withdrawStatus)}</p>
         <p><strong>Date:</strong> 
  {selectedRequest?.createdAt 
    ? new Date(selectedRequest.createdAt).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric"
      }) 
    : "N/A"}
</p>

            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          {selectedRequest?.withdrawStatus === 'pending' && (
            <>
              <Button variant="danger" onClick={() => handleDecline(selectedRequest._id)}>Reject</Button>
              <Button variant="success" onClick={() => handleApprove(selectedRequest._id)}>Approve</Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FundRequest;
