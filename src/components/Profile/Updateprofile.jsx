import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const Updateprofile = () => {
  return (
    <div className="container py-5">
      <Card className="shadow-sm card-green">
        <Card.Body>
          <h3 className="mb-4">Personal Information</h3>
          <div className="d-flex flex-column flex-md-row gap-4 mb-4">
            <div className="text-center">
              <div className="position-relative mb-2" style={{ width: 130, height: 130 }}>
                <img
                  src="https://readdy.ai/api/search-image?query=Professional%20business%20person%20avatar%20placeholder%20with%20minimalist%20design%2C%20soft%20green%20background%2C%20suitable%20for%20admin%20dashboard%20profile%2C%20high%20quality%20professional%20appearance&width=300&height=300&seq=1&orientation=squarish"
                  alt="Profile"
                  className="img-fluid rounded-circle w-100 h-100 object-fit-cover"
                />
                <Button
                  variant="success"
                  size="sm"
                  className="position-absolute top-50 start-50 translate-middle rounded-circle"
                >
                  <i className="fas fa-camera"></i>
                </Button>
              </div>
              <Button variant="link" className="text-success p-0">Change Photo</Button>
            </div>

            <div className="flex-grow-1">
              <Form.Group className="mb-3 ">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" defaultValue="Admin User" className='input-green'  />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" defaultValue="admin@company.com" className='input-green'/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control type="text" value="System Administrator" className='input-green' />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              defaultValue="System administrator with full access to all platform features and settings."
              className='input-green'
            />
          </Form.Group>

          <div className="text-end">
            <Button variant="success">Save Changes</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Updateprofile;
