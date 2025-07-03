import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DashboardTable from "./DashboardTable";
import axiosInstance from "../../../utils/axiosInstance";
const DashboardCard = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const handleCardClick = (filterType) => {
    setActiveFilter(activeFilter === filterType ? null : filterType);
  };
  const [installments, setInstallments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstallments();
  }, []);

  const fetchInstallments = async () => {
    try {
      const res = await axiosInstance.get("/autoDeductInstallments");
      console.log(res.data.logs)
      setInstallments(res.data.data || []); 
    } catch (error) {
      console.error("❌ Failed to fetch installments:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-success-subtle py-4 min-vh-100">
      <Container>
        {/* Heading */}
        <div className="mb-4 text-center text-md-start">
          <h4 className="page-heading">Hello Ladybug</h4>
          <p className="page-subheading text-muted">Welcome to the Ladybug Dashboard</p>
        </div>

        {/* Stats Cards */}
        <Row className="g-4">
          <Col xs={12} sm={6} lg={4}>
            <div 
              className={`p-4 rounded shadow-sm card-green h-100 ${activeFilter === 'all' ? 'border border-success border-2' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => handleCardClick('all')}>
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

          {/* Card 2 - Pending Funding Requests */}
          <Col xs={12} sm={6} lg={4}>
            <div  className={`p-4 rounded shadow-sm card-green h-100 ${activeFilter === 'pending' ? 'border border-success border-2' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => handleCardClick('pending')}>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="mb-1 text-muted">Pending Requests</p>
                  <h5 className="fw-bold">42</h5>
                  <small className="text-warning">5 new today</small>
                </div>
                <i className="fa-solid fa-clock text-warning fs-4"></i>
              </div>
            </div>
          </Col>

          {/* Card 4 - Payments Overdue */}
          <Col xs={12} sm={6} lg={4}>
            <div 
              className={`p-4 rounded shadow-sm card-green h-100 ${activeFilter === 'overdue' ? 'border border-success border-2' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => handleCardClick('overdue')}
            >
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="mb-1 text-muted">Payments Overdue</p>
                  <h5 className="fw-bold">$1,250,000</h5>
                  <small className="text-danger">3% of portfolio</small>
                </div>
                <i className="fa-solid fa-exclamation-circle text-danger fs-4"></i>
              </div>
            </div>
          </Col>
        </Row>

       
        <div className="mt-4">
          <DashboardTable filter={activeFilter} />
        </div>
      </Container>
    </div>
  );
};

export default DashboardCard;