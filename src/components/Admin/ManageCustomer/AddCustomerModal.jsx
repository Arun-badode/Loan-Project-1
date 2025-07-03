import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import BASE_URL from '../../../utils/baseURL';

const AddCustomerModal = ({ show, handleClose }) => {
  const [form, setForm] = useState({
    customerName: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    address: '',
    creditLine: '',
    password: '',
  });

  const [gstDoc, setGstDoc] = useState(null);
  const [panDoc, setPanDoc] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach(key => {
      formData.append(key, form[key]);
    });

    if (gstDoc) formData.append('gstDoc', gstDoc);
    if (panDoc) formData.append('panDoc', panDoc);

    try {
      await axios.post(`${BASE_URL}/createcustomer`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert("✅ Customer added successfully!");
      handleClose();
    } catch (error) {
      console.error("❌ Error adding customer:", error);
      alert("❌ Failed to add customer");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size='lg'  centered backdrop="static" className='modal-green'>
      <Modal.Header closeButton>
        <Modal.Title>Add New Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  name="customerName"
                  placeholder="Enter customer name"
                  value={form.customerName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  placeholder="Enter company name"
                  value={form.companyName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
  <Form.Group className="mb-3">
    <Form.Label>Password</Form.Label>
    <Form.Control
      type="password"
      name="password"
      placeholder="Enter password"
      value={form.password}
      onChange={handleChange}
      required
    />
  </Form.Group>
</Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Enter address"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Credit Line</Form.Label>
                <InputGroup>
                  <InputGroup.Text>₹</InputGroup.Text>
                  <Form.Control
                    type="number"
                    name="creditLine"
                    placeholder="Enter credit line amount"
                    value={form.creditLine}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Upload  Document</Form.Label>
                <Form.Control
                  type="file"
                  accept=".jpg,.png,.pdf"
                  onChange={(e) => setGstDoc(e.target.files[0])}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Upload  Document</Form.Label>
                <Form.Control
                  type="file"
                  accept=".jpg,.png,.pdf"
                  onChange={(e) => setPanDoc(e.target.files[0])}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end">
            <Button variant="outline-secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Add Customer
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCustomerModal;
