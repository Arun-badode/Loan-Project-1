import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import axiosInstance from '../../utils/axiosInstance';

const Changepassword = () => {
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');

  // Get user ID from localStorage
  useEffect(() => {
    const storedId = JSON.parse(localStorage.getItem('login_id'));
    if (storedId) {
      setUserId(storedId);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const payload = { password };
      await axiosInstance.patch(`/change-password/${userId}`, payload);
      alert('✅ Password updated successfully');
      setPassword('');
    } catch (error) {
      console.error('❌ Error updating password:', error);
      alert('❌ Failed to update password');
    }
  };

  return (
    <div className="container py-5">
      <Card className="shadow-sm card-green">
        <Card.Body>
          <h3 className="mb-4">Change Password</h3>

          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-green"
              placeholder="Enter new password"
            />
          </Form.Group>

          <div className="text-end">
            <Button
              variant="success"
              disabled={!password}
              onClick={handleSubmit}
            >
              Update Password
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Changepassword;
