import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import axiosInstance from '../../../utils/axiosInstance';
import BASE_URL from '../../../utils/baseURL';

const EditCreditModal = ({ show, handleClose, customer, fetchCustomers }) => {
  const [formData, setFormData] = useState({
    approvedAmount: '',
    factorRate: '',
    term_month: '',
    totalRepayment: 0,
    monthlyInstallment: 0
  });

  useEffect(() => {
    if (customer) {
      const approvedAmount = customer.approvedAmount || '';
      const factorRate = customer.factorRate || '';
      const term_month = customer.term_month || '';
      const totalRepayment = approvedAmount && factorRate ? (approvedAmount * factorRate).toFixed(2) : 0;
      const monthlyInstallment = totalRepayment && term_month ? (totalRepayment / term_month).toFixed(2) : 0;

      setFormData({
        approvedAmount,
        factorRate,
        term_month,
        totalRepayment,
        monthlyInstallment
      });
    }
  }, [customer]);

  if (!customer) return null;

 const handleChange = (e) => {
  const { name, value } = e.target;

  const updated = {
    ...formData,
    [name]: value
  };

  const approvedAmount = parseFloat(name === 'approvedAmount' ? value : updated.approvedAmount);
  const factorRate = parseFloat(name === 'factorRate' ? value : updated.factorRate);
  const term = parseFloat(name === 'term_month' ? value : updated.term_month);

  if (!isNaN(approvedAmount) && !isNaN(factorRate)) {
    const total = approvedAmount * factorRate;
    updated.totalRepayment = total.toFixed(2);

    if (!isNaN(term) && term > 0) {
      updated.monthlyInstallment = (total / term).toFixed(2);
    } else {
      updated.monthlyInstallment = 0;
    }
  }

  setFormData(updated);
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.patch(`${BASE_URL}/updatecustomer/${customer._id}`, formData);
      alert(`✅ Updated credit terms for ${customer.customerName}`);
      handleClose();
      fetchCustomers();
    } catch (error) {
      console.error("❌ Error updating credit terms:", error);
      alert("❌ Failed to update. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" className="modal-green">
      <Modal.Header closeButton>
        <Modal.Title>Update Credit Terms - {customer.customerName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <p>Credit Line: ₹{customer.creditLine}</p>
            <Form.Label>Approved Amount</Form.Label>
            <InputGroup>
              <InputGroup.Text>₹</InputGroup.Text>
              <Form.Control
                name="approvedAmount"
                type="number"
                value={formData.approvedAmount}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Factor Rate</Form.Label>
            <Form.Control
              name="factorRate"
              type="number"
              step="0.01"
              value={formData.factorRate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Total Repayment</Form.Label>
            <InputGroup>
              <InputGroup.Text>₹</InputGroup.Text>
              <Form.Control
                type="number"
                value={formData.totalRepayment}
                readOnly
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Term (months)</Form.Label>
           <Form.Control
  name="term_month"
  type="number"
  value={formData.term_month}
  onChange={handleChange}
  required
/>

          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Monthly Installment</Form.Label>
            <InputGroup>
              <InputGroup.Text>₹</InputGroup.Text>
              <Form.Control
                type="number"
                value={formData.monthlyInstallment}
                readOnly
              />
            </InputGroup>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Update Terms
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditCreditModal;
