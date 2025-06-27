import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

const AddCustomerModal = ({ show, handleClose }) => {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    creditLine: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your logic to add customer here
    alert(`Customer "${form.name}" added!`);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" className='modal-green'>
      <Modal.Header closeButton>
        <Modal.Title>Add New Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter customer name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Company</Form.Label>
            <Form.Control
              type="text"
              name="company"
              placeholder="Enter company name"
              value={form.company}
              onChange={handleChange}
              required
            />
          </Form.Group>

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

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>

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

          <Form.Group className="mb-3">
            <Form.Label>Credit Line</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
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