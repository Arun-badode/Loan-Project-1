import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card, Modal, Table } from 'react-bootstrap';
import axiosInstance from '../../../utils/axiosInstance';
import { Row, Col } from 'react-bootstrap';
const Repayment = () => {
  const [payAmount, setPayAmount] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [customerData, setCustomerData] = useState(null);
  const [repaymentHistory, setRepaymentHistory] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fetch Customer ID from localStorage
  useEffect(() => {
    const storedId = JSON.parse(localStorage.getItem("login_id"));
    if (storedId) {
      setCustomerId(storedId);
    }
  }, []);

  // Fetch customer loan details
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axiosInstance.get(`/custumers`, {
          params: { customerId }
        });
        if (response.data?.customers?.length) {
          setCustomerData(response.data.customers[0]);
        }
      } catch (error) {
        console.error("❌ Error fetching customer data:", error);
      }
    };

    if (customerId) {
      fetchCustomerData();
    }
  }, [customerId]);

  // Fetch repayment history
  const fetchRepaymentHistory = async () => {
    try {
      const response = await axiosInstance.get(`/getrepayments`, {
        params: { customerId }
      });
      console.log(response)
      if (Array.isArray(response.data?.result
)) {
        setRepaymentHistory(response.data.result
);
      }
    } catch (error) {
      console.error("❌ Error fetching repayments:", error);
    }
  };
  
  useEffect(() => {
    if (customerId) {
      fetchRepaymentHistory();
    }
  }, [customerId]);

const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage({ type: '', text: '' });

  if (!payAmount || isNaN(payAmount)) {
    return setMessage({ type: 'danger', text: 'Please enter a valid amount.' });
  }

  try {
    setLoading(true);
    const res = await axiosInstance.post('/repayments', {
      customerId,
      payAmount
    });

    if (res?.data?.success) {
      const newRepayment = {
        _id: res?.data?.repaymentId || Math.random().toString(),
        createdAt: new Date().toISOString(),
        payAmount,
        payStatus: 'pending'
      };

      setRepaymentHistory(prev => [newRepayment, ...prev]); // Show instantly
      setPayAmount('');
      setShowModal(false); // ✅ Close modal
      setMessage({ type: 'success', text: 'Repayment submitted successfully!' });

      // Optionally: remove message after a few seconds
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } else {
      setMessage({ type: 'danger', text: res?.data?.message || 'Repayment failed.' });
    }
  } catch (error) {
    console.error(error);
    setMessage({ type: 'danger', text: 'Something went wrong. Please try again.' });
  } finally {
    setLoading(false);
  }
};


  return (
    <Container className="py-4">
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <h4 className="text-success mb-3">Your Repayment Summary</h4>
          {customerData ? (
          <Row className="mb-3">
  <Col md={4} sm={12}>
    <p className="mb-1"><strong>Total Repayment:</strong> ${customerData.totalRepayment}</p>
  </Col>
  <Col md={4} sm={12}>
    <p className="mb-1"><strong>Term (Months):</strong> {customerData.term_month}</p>
  </Col>
  <Col md={4} sm={12}>
    <p className="mb-1"><strong>Monthly Installment:</strong> ${customerData.monthlyInstallment}</p>
  </Col>
</Row>

          ) : (
            <p className="text-muted">Loading repayment info...</p>
          )}
          <Button variant="success" onClick={() => setShowModal(true)}>
            Make Repayment
          </Button>
        </Card.Body>
      </Card>

      {/* Repayment Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Make a Repayment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message.text && <Alert variant={message.type}>{message.text}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Repayment Amount (₹)</Form.Label>
              <Form.Control
                type="number"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                placeholder="Enter amount"
                required
              />
            </Form.Group>
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? 'Processing...' : 'Submit Repayment'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Repayment History */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          <h5 className="mb-3">Repayment History</h5>
          <div className="table-responsive">
            <Table hover bordered>
             <thead className="table-success">
  <tr>
    <th>#</th>
    <th>Date</th>
    <th>Amount ($)</th>
    <th>Status</th>
  </tr>
</thead>
<tbody>
  {repaymentHistory.length > 0 ? (
    repaymentHistory.map((repayment, index) => (
      <tr key={repayment._id || index}>
        <td>{index + 1}</td>
        <td>{new Date(repayment.createdAt).toLocaleDateString()}</td>
        <td>${repayment.payAmount}</td>
        <td>
          <span className={`badge text-capitalize px-2 py-1 rounded-pill fw-semibold
            ${repayment.payStatus === 'approved' ? 'bg-success' :
              repayment.payStatus === 'pending' ? 'bg-warning text-dark' :
              'bg-danger'}`}>
            {repayment.payStatus}
          </span>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4" className="text-center text-muted">No repayment history found.</td>
    </tr>
  )}
</tbody>

            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Repayment;
