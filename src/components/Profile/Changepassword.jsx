import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const Changepassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isDisabled = !currentPassword || !newPassword || newPassword !== confirmPassword;

  return (
    <div className="container py-5">
      {/* Password Change */}
      <Card className="mb-4 shadow-sm card-green">
        <Card.Body>
          <h3 className="mb-4">Change Password</h3>

          <Form.Group className="mb-3">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className='input-green'
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='input-green'
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='input-green'
            />
          </Form.Group>

          <div className="bg-light p-3 rounded mb-3">
            <p className="mb-1 fw-semibold">Password Requirements:</p>
            <ul className="small ps-3 mb-0">
              <li>Minimum 8 characters</li>
              <li>At least one uppercase letter</li>
              <li>At least one number</li>
              <li>At least one special character</li>
            </ul>
          </div>

          <div className="text-end">
            <Button variant="success" >Update Password</Button>
          </div>
        </Card.Body>
      </Card>

      
      
    </div>
  );
};

export default Changepassword;
