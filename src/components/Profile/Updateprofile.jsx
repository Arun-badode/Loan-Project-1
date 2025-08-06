import React, { useEffect, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import axiosInstance from '../../utils/axiosInstance';

const UpdateProfile = () => {
  const [customerData, setCustomerData] = useState({
    customerName: '',
    email: '',
    phoneNumber: '',
    companyName: '' // ✅ NEW FIELD
  });

  const [customerId, setCustomerId] = useState(null);

  // Fetch ID from localStorage
  useEffect(() => {
    const storedId = JSON.parse(localStorage.getItem('login_id'));
    if (storedId) {
      setCustomerId(storedId);
      fetchCustomerData(storedId);
    }
  }, []);

  // Fetch customer data
  const fetchCustomerData = async (id) => {
    try {
      const response = await axiosInstance.get(`/custumers?customerId=${id}`);
      console.log('✅ API Response:', response.data);
      const data = response.data.customers[0]; // ✅ Assuming array inside `customers`
      if (data) {
        setCustomerData({
          customerName: data.customerName || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
          companyName: data.companyName || '' // ✅ Populate companyName
        });
      }
    } catch (error) {
      console.error('❌ Error fetching customer data:', error);
    }
  };

  // Handle form changes
  const handleChange = (field, value) => {
    setCustomerData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Submit update
  const handleSubmit = async () => {
    try {
      await axiosInstance.put(`/updateCustumer/${customerId}`, customerData);
      alert('✅ Profile updated successfully!');
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      alert('❌ Failed to update profile.');
    }
  };

  return (
    <div className="container py-5">
      <Card className="shadow-sm card-green">
        <Card.Body>
          <h3 className="mb-4">Update Profile</h3>
          <div className="d-flex flex-column flex-md-row gap-4 mb-4">
            <div className="flex-grow-1">
              <Form.Group className="mb-3">
                <Form.Label className="label-green">Full Name</Form.Label>
                <Form.Control
                  type="text"
                  value={customerData.customerName}
                  onChange={(e) => handleChange('customerName', e.target.value)}
                  className="input-green"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="label-green">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={customerData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="input-green"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="label-green">Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  value={customerData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  className="input-green"
                />
              </Form.Group>

              {/* ✅ Company Name Field */}
              <Form.Group className="mb-3">
                <Form.Label className="label-green">Company Name</Form.Label>
                <Form.Control
                  type="text"
                  value={customerData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="input-green"
                />
              </Form.Group>
            </div>
          </div>

          <div className="text-end">
            <Button variant="success" onClick={handleSubmit}>
              Update Profile
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UpdateProfile;
