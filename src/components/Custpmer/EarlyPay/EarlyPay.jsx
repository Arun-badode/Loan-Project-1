import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import axiosInstance from '../../../utils/axiosInstance';

const EarlyPay = () => {
  const [earlyPayAmount, setEarlyPayAmount] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  // ✅ Get customerId from localStorage only
  useEffect(() => {
    const storedId = JSON.parse(localStorage.getItem("login_id"));
    if (storedId) {
      setCustomerId(storedId);
    }
  }, []);

  const handleEarlyPayoff = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!earlyPayAmount || isNaN(earlyPayAmount)) {
      return setMessage({ type: 'danger', text: 'Enter a valid payoff amount.' });
    }
    try {
      setLoading(true);
      const res = await axiosInstance.post(`/earlyPayoff`, {
        customerId,
        earlyPayAmount: Number(earlyPayAmount)
      });

      if (res?.data?.success) {
        setMessage({ type: 'success', text: '✅ Early payoff submitted successfully!' });
        setEarlyPayAmount('');
      } else {
        setMessage({ type: 'danger', text: res?.data?.message || 'Early payoff failed.' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'danger', text: 'Something went wrong while submitting payoff.' });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  return (
    <Container className="py-4">
      <Card className="shadow-sm border-0">
        <Card.Body>
         <h4 className="page-heading mb-2">Early Payoff Discount</h4>
              {/* Discount Term Notice */}
              <Card className="mb-5 card-green border-0">
                <Card.Body>
                  <h5 className="fw-bold mb-2">Early Payback Discount Offers</h5>
                  <ul className="mb-0">
                       Access 100% of your funds within 10 days and pay back full within 30 days - Get $5% discount
                  </ul>
                </Card.Body>
              </Card>
          {message.text && <Alert variant={message.type}>{message.text}</Alert>}
          <Form onSubmit={handleEarlyPayoff}>
            <Form.Group className="mb-3">
              <Form.Label>Early Payoff Amount ($)</Form.Label>
              <Form.Control type="number"  value={earlyPayAmount}
                onChange={(e) => setEarlyPayAmount(e.target.value)}   placeholder="Enter payoff amount"   required />
            </Form.Group>
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? 'Processing...' : 'Submit Early Payoff'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EarlyPay;
