import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import axiosInstance from '../../../utils/axiosInstance';

const EarlyPay = () => {
  const [customerId, setCustomerId] = useState('');
  const [discountInfo, setDiscountInfo] = useState(null);
  const [customerData, setCustomerData] = useState(null); // Holds full customer data
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("login-detail"));
    if (storedData?.id) {
      setCustomerId(storedData.id);
      fetchCustomerData(storedData.id); // fetch full customer info
      fetchDiscountInfo(storedData.id); // fetch discount info
    }
  }, []);

  const fetchCustomerData = async (id) => {
    try {
      const response = await axiosInstance.get(`/custumers?customerId=${id}`);
      const data = response.data.customers[0];
      setCustomerData(data);
    } catch (error) {
      console.error('❌ Error fetching customer data:', error);
    }
  };

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

const getDiscountedAmount = () => {
  if (!customerData) return '0.00';

  const approvedAmount = parseFloat(customerData.approvedAmount || 0);
  const factorRate = parseFloat(customerData.factorRate || 0);

  if (approvedAmount <= 0 || factorRate <= 0) {
    return '0.00';
  }

  const today = new Date();
  const startTen = new Date(discountInfo?.startDateTen);
  const endTen = new Date(discountInfo?.endDateTen);
  const startFive = new Date(discountInfo?.startDateFive);
  const endFive = new Date(discountInfo?.endDateFive);

  let discountPercent = 0;

  if (
    discountInfo &&
    !isNaN(startTen.getTime()) &&
    !isNaN(endTen.getTime()) &&
    today >= startTen &&
    today <= endTen
  ) {
    discountPercent = discountInfo.discountTen || 0;
  } else if (
    discountInfo &&
    !isNaN(startFive.getTime()) &&
    !isNaN(endFive.getTime()) &&
    today >= startFive &&
    today <= endFive
  ) {
    discountPercent = discountInfo.discountFive || 0;
  }

  // Apply discount to factorRate
  const discountValue = discountPercent / 100;
  const discountedFactorRate = factorRate - discountValue;
  const discountedAmount = approvedAmount * discountedFactorRate;

  return discountedAmount.toFixed(2);
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

const handleEarlyPayoff = async (e) => {
  e.preventDefault();
  setMessage({ type: '', text: '' });

  const discountedAmount = getDiscountedAmount();

  if (Number(discountedAmount) <= 0) {
    setMessage({ type: 'danger', text: '❌ Nothing to pay. Your balance is already cleared.' });
    return;
  }

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


  return (
    <Container className="py-4">
      <Card className="shadow-sm border-0">
        <Card.Body>
          <h4 className="page-heading mb-2">Early Payoff Discount</h4>

          <Alert variant="info" className="mb-3">
            {getCurrentDiscountMessage()}
          </Alert>

          {customerData && (
            <Alert variant="secondary">
              <div><strong>Current Payoff Amount:</strong> ${parseFloat(customerData.remainingRepayment).toFixed(2)}</div>

              {isDiscountApplied() && (
                <div><strong>Discounted Amount to Pay:</strong> ${getDiscountedAmount()}</div>
              )}
            </Alert>
          )}

          {message.text && <Alert variant={message.type}>{message.text}</Alert>}

        <Form onSubmit={handleEarlyPayoff}>
  <Form.Group className="mb-3">
    <Form.Label>Payoff Amount</Form.Label>
    <div className="input-group">
      <span className="input-group-text">$</span>
      <Form.Control
        type="text"
        value={getDiscountedAmount()}
        readOnly
      />
    </div>
  </Form.Group>

  <Button variant="success" type="submit" disabled={loading}>
    {loading ? 'Processing...' : 'Request Early Payoff'}
  </Button>
</Form>

        </Card.Body>
      </Card>
    </Container>
  );
};

export default EarlyPay;
