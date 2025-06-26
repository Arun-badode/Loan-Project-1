import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const DashboardCard= () => {
  return (
    <div className="bg-success-subtle py-4 min-vh-100">
      <Container>
        {/* Heading */}
        <div className="mb-4">
          <h4 className="fw-bold">Hello Admin</h4>
          <p className="text-muted">Welcome to the Admin Dashboard</p>
        </div>

        {/* Stats Cards */}
        <Row className="g-4">
          {/* Card 1 */}
          <Col xs={12} md={4}>
            <div className="p-4 rounded shadow-sm bg-white h-100">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="mb-1 text-muted">Total Customers</p>
                  <h5 className="fw-bold">1,250</h5>
                  <small className="text-success">+15% from last month</small>
                </div>
                <i className="fa-solid fa-users text-success fs-4"></i>
              </div>
            </div>
          </Col>

          {/* Card 2 */}
          <Col xs={12} md={4}>
            <div className="p-4 rounded shadow-sm bg-white h-100">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="mb-1 text-muted">Total Credit Approved</p>
                  <h5 className="fw-bold">$150,000,000</h5>
                  <small className="text-success">+8% from last month</small>
                </div>
                <i className="fa-solid fa-circle-check text-primary fs-4"></i>
              </div>
            </div>
          </Col>

          {/* Card 3 */}
          <Col xs={12} md={4}>
            <div className="p-4 rounded shadow-sm bg-white h-100">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="mb-1 text-muted">Total Drawn Amount</p>
                  <h5 className="fw-bold">$60,000,000</h5>
                  <small className="text-success">+12% from last month</small>
                </div>
                <i className="fa-solid fa-money-bill-wave text-danger fs-4"></i>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DashboardCard;
