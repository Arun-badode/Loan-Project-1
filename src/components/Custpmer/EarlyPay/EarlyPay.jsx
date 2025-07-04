import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card, Modal, Table, Row, Col } from 'react-bootstrap';
import axiosInstance from '../../../utils/axiosInstance';

const EarlyPay = () => {
  const [earlyPayAmount, setEarlyPayAmount] = useState('');
  const [discount, setDiscount] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [customerData, setCustomerData] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fetch Customer ID
  useEffect(() => {
    const storedId = JSON.parse(localStorage.getItem("login_id"));
    if (storedId) {
      setCustomerId(storedId);
    }
  }, []);

  // Fetch Customer Info
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

  // Handle Submit
  const handleEarlyPayoff = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!earlyPayAmount || isNaN(earlyPayAmount)) {
      return setMessage({ type: 'danger', text: 'Enter a valid payoff amount.' });
    }

    try {
      setLoading(true);
      const res = await axiosInstance.post('/earlyPayoff', {
        customerId,
        earlyPayAmount: Number(earlyPayAmount),
        discount: Number(discount) || 0
      });

      if (res?.data?.success) {
        setMessage({ type: 'success', text: '✅ Early payoff submitted successfully!' });
        setEarlyPayAmount('');
        setDiscount('');
        setShowModal(false);
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'danger', text: res?.data?.message || 'Early payoff failed.' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'danger', text: 'Something went wrong while submitting payoff.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <h4 className="text-success mb-3">Early Payoff Summary</h4>
          {customerData ? (
            <Row className="mb-3">
              <Col md={4}><strong>Remaining Repayment:</strong> ${customerData.remainingRepayment}</Col>
              <Col md={4}><strong>Term:</strong> {customerData.term_month} months</Col>
              <Col md={4}><strong>Monthly Installment:</strong> ${customerData.installment}</Col>
            </Row>
          ) : (
            <p className="text-muted">Loading customer info...</p>
          )}
          <Button variant="success" onClick={() => setShowModal(true)}>Early Pay Now</Button>
        </Card.Body>
      </Card>

      {/* Early Pay Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Early Payoff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message.text && <Alert variant={message.type}>{message.text}</Alert>}
          <Form onSubmit={handleEarlyPayoff}>
            <Form.Group className="mb-3">
              <Form.Label>Early Payoff Amount (₹)</Form.Label>
              <Form.Control
                type="number"
                value={earlyPayAmount}
                onChange={(e) => setEarlyPayAmount(e.target.value)}
                placeholder="Enter full payoff amount"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Discount (₹)</Form.Label>
              <Form.Control
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="Enter discount if any"
              />
            </Form.Group>
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? 'Processing...' : 'Submit Payoff'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default EarlyPay;
