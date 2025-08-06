import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Table, Modal } from 'react-bootstrap';
import axiosInstance from '../../../utils/axiosInstance';

const DashboardTable = () => {
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // 🟢 Fetch withdrawal requests on mount
  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await axiosInstance.get("/getallwithdrawpayment");
        const data = response.data?.result || [];
        setRequests(data.reverse()); // ✅ Reverse for latest first
      } catch (err) {
        console.error("❌ Error fetching withdrawals:", err);
      }
    };
    fetchWithdrawals();
  }, []);

  // 🟡 Format date
  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    });

  // 🔘 Badge UI
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

  return (
    <Container className="py-4 min-vh-100">
      <h5 className="mb-4">Latest Funding Requests</h5>

      {/* 🟢 Requests Table */}
      <Card className="shadow-sm border-0">
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead className=" table-success">
                <tr>
                  <th>Account Number</th>
                  <th>Name</th>
                  <th>Requested</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.length > 0 ? (
                  requests.map((req) => (
                    <tr key={req._id}>
                      <td>{req?.einNumber}</td>
                      <td>{req?.customerName}</td>
                      <td>${Number(req.withdrawAmount).toLocaleString()}</td>
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
                        <Button
                          size="sm"
                          variant="outline-success"
                          onClick={() => {
                            setSelectedRequest(req);
                            setShowModal(true);
                          }}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* 🔍 Modal for Request Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Request Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <>
              <p><strong>Customer ID:</strong> {selectedRequest.customerId?.slice(-9).toUpperCase()}</p>
              <p><strong>Name:</strong> {selectedRequest.customerName}</p>
              <p><strong>Approved Credit Line:</strong> ${selectedRequest.approvedCreditLine}</p>
              <p><strong>Available Amount:</strong> ${selectedRequest.availableAmount}</p>
              <p><strong>Requested Amount:</strong> ${selectedRequest.withdrawAmount}</p>
              <p><strong>Status:</strong> {getStatusBadge(selectedRequest.withdrawStatus)}</p>
              <p><strong>Date:</strong> {formatDate(selectedRequest.createdAt)}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DashboardTable;
