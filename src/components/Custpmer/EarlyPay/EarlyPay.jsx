import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import axiosInstance from '../../../utils/axiosInstance';

const EarlyPay = () => {
  const [earlyPayAmount, setEarlyPayAmount] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [discountInfo, setDiscountInfo] = useState(null);
  const [remainingAmount, setRemainingAmount] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const storedData = JSON.parse(localStorage.getItem("login-detail"));

  if (storedData?.id) {
    setCustomerId(storedData.id); // ✅ Correct ID
    fetchDiscountInfo(storedData.id); // ✅ Discount API
  }

  if (storedData?.remainingRepayment) {
    setRemainingAmount(Number(storedData.remainingRepayment)); // ✅ From login-detail directly
  }
}, []);
;

  // ✅ Fetch discount info
  const fetchDiscountInfo = async (id) => {
    try {
      const res = await axiosInstance.get(`/discount?customerId=${id}`);
      if (res?.data?.data?.length > 0) {
        setDiscountInfo(res.data.data[0]);
      }
    } catch (error) {
      console.error('Error fetching discount info:', error);
    }
  };

  // ✅ Get eligible discount amount
  const getDiscountedAmount = () => {
    if (!discountInfo || !remainingAmount) return remainingAmount;

    const today = new Date();
    const startTen = new Date(discountInfo.startDateTen);
    const endTen = new Date(discountInfo.endDateTen);
    const startFive = new Date(discountInfo.startDateFive);
    const endFive = new Date(discountInfo.endDateFive);

    if (today >= startTen && today <= endTen) {
      return (remainingAmount - (remainingAmount * (discountInfo.discountTen / 100))).toFixed(2);
    } else if (today >= startFive && today <= endFive) {
      return (remainingAmount - (remainingAmount * (discountInfo.discountFive / 100))).toFixed(2);
    }
    return remainingAmount.toFixed(2);
  };

const getCurrentDiscountMessage = () => {
  if (!discountInfo) return '⚠️ No discount currently available.';

  const today = new Date();

  const startTen = new Date(discountInfo.startDateTen);
  const endTen = new Date(discountInfo.endDateTen);
  const startFive = new Date(discountInfo.startDateFive);
  const endFive = new Date(discountInfo.endDateFive);

  if (
    isNaN(startTen.getTime()) || isNaN(endTen.getTime()) ||
    isNaN(startFive.getTime()) || isNaN(endFive.getTime())
  ) {
    return '⚠️ No discount currently available.';
  }

  if (today >= startTen && today <= endTen) {
    return `🎉 You're eligible for a ${discountInfo.discountTen}% early payoff discount until ${endTen.toDateString()}.`;
  } else if (today >= startFive && today <= endFive) {
    return `🎉 You're eligible for a ${discountInfo.discountFive}% early payoff discount until ${endFive.toDateString()}.`;
  } else {
    return '⚠️ No discount currently available.';
  }
};

  // ✅ Handle submit
  const handleEarlyPayoff = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    const discountedAmount = getDiscountedAmount();

    try {
      setLoading(true);
      const res = await axiosInstance.post(`/earlyPayoff`, {
        customerId,
        earlyPayAmount: Number(discountedAmount),
      });

      if (res?.data?.success) {
        setMessage({ type: 'success', text: '✅ Early payoff submitted successfully!' });
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
const isDiscountApplied = () => {
  if (!discountInfo) return false;

  const today = new Date();
  const startTen = new Date(discountInfo.startDateTen);
  const endTen = new Date(discountInfo.endDateTen);
  const startFive = new Date(discountInfo.startDateFive);
  const endFive = new Date(discountInfo.endDateFive);

  return (
    (today >= startTen && today <= endTen) ||
    (today >= startFive && today <= endFive)
  );
};

  return (
    <Container className="py-4">
      <Card className="shadow-sm border-0">
        <Card.Body>
          <h4 className="page-heading mb-2">Early Payoff Discount</h4>

      <Alert variant="info" className="mb-3">
  {getCurrentDiscountMessage()}
</Alert>
        {remainingAmount && (
  <Alert variant="secondary">
    <div><strong>Current Payoff Amount:</strong> ${remainingAmount.toFixed(2)}</div>

    {isDiscountApplied() && (
      <div><strong>Discounted Amount to Pay:</strong> ${getDiscountedAmount()}</div>
    )}
  </Alert>
)}

          {message.text && <Alert variant={message.type}>{message.text}</Alert>}

          <Form onSubmit={handleEarlyPayoff}>
            <Form.Group className="mb-3">
              <Form.Label> Payoff Amount</Form.Label>
              <Form.Control
                type="number"
                value={getDiscountedAmount()}
                readOnly
              />
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
