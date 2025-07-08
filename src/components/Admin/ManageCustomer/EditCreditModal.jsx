import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import axiosInstance from '../../../utils/axiosInstance';
import BASE_URL from '../../../utils/baseURL';

const EditCreditModal = ({ show, handleClose, customer, refreshCustomers }) => {
  const [formData, setFormData] = useState({
    approvedAmount: '',
    factorRate: '',
    term_month: '',
    term_type: 'monthly',
    totalRepayment: 0,
    installment: 0,
    availBalance: 0,
  });

  useEffect(() => {
    if (customer) {
      const approvedAmount = parseFloat(customer.approvedAmount) || 0;
      const factorRate = parseFloat(customer.factorRate) || 0;
      const term_month = parseInt(customer.term_month) || 0;

      const totalRepayment = (approvedAmount * factorRate).toFixed(2);
      const installment = term_month > 0 ? (totalRepayment / term_month).toFixed(2) : 0;

      setFormData({
        approvedAmount,
        factorRate,
        term_month,
        term_type: customer.term_type || 'monthly',
        totalRepayment,
        installment,
        availBalance: approvedAmount,
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

    if (!isNaN(approvedAmount)) {
      updated.availBalance = approvedAmount;
    }

    if (!isNaN(approvedAmount) && !isNaN(factorRate)) {
      const total = approvedAmount * factorRate;
      updated.totalRepayment = total.toFixed(2);

      if (!isNaN(term) && term > 0) {
        updated.installment = (total / term).toFixed(2);
      } else {
        updated.installment = 0;
      }
    }

    setFormData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`${BASE_URL}/updateCustumer/${customer._id}`, formData);
      alert(`✅ Updated credit terms for ${customer.customerName}`);
      handleClose();
      if (refreshCustomers) refreshCustomers();
    } catch (error) {
      console.error("❌ Error updating credit terms:", error);
      alert("❌ Failed to update. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" className="modal-green">
      <Modal.Header closeButton>
        <Modal.Title>Add Credit Terms - {customer.customerName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <p><strong>Credit Line:</strong> ${customer.creditLine}</p>
            <Form.Label>Approved Amount</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
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
            <Form.Label>Factor Rate </Form.Label>
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
            <Form.Label>Total  Payback</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="number"
                value={formData.totalRepayment}
                readOnly
              />
            </InputGroup>
          </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Installment Frequency</Form.Label>
            <Form.Select
              name="term_type"
              value={formData.term_type}
              onChange={handleChange}
            >
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
              <option value="Bi-Weekly">Bi-Weekly</option>
            </Form.Select>
          </Form.Group>
       <Form.Group className="mb-3">
  <Form.Label>
    {formData.term_type === "Weekly"
      ? "Term (Weeks)"
      : formData.term_type === "Bi-Weekly"
      ? "Term (Bi-Weeks)"
      : "Term (Months)"}
  </Form.Label>
  <Form.Control
    name="term_month"
    type="number"
    value={formData.term_month}
    onChange={handleChange}
    required
  />
</Form.Group>

      
          <Form.Group className="mb-3">
            <Form.Label>Installment</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="number"
                value={formData.installment}
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
