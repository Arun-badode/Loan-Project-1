import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DashboardTable from "./DashboardTable";
import axiosInstance from "../../../utils/axiosInstance";

const DashboardCard = () => {
  const [installments, setInstallments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🟢 Dashboard data from localStorage
  const [dashboardStats, setDashboardStats] = useState({
    totalCustomers: 0,
    approvedRequest: 0,
    pendingRequest: 0,
  });

  useEffect(() => {
    const storedLogin = JSON.parse(localStorage.getItem("login-detail"));
    if (storedLogin) {
      setDashboardStats({
        totalCustomers: storedLogin.totalCustomers || 0,
        approvedRequest: storedLogin.approvedRequest || 0,
        pendingRequest: storedLogin.pendingRequest || 0,
      });
    }

    fetchInstallments();
  }, []);

  const fetchInstallments = async () => {
    try {
      const res = await axiosInstance.get("/autoDeductInstallments");
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

        {/* Cards */}
        <Row className="g-4">
          {/* Total Customers */}
          <Col xs={12} sm={6} lg={4}>
            <div className="p-4 rounded shadow-sm card-green h-100">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="mb-1 text-muted">Total Customers</p>
                  <h5 className="fw-bold">{dashboardStats.totalCustomers}</h5>
                  <small className="text-success">+15% from last month</small>
                </div>
                <i className="fa-solid fa-users text-success fs-4"></i>
              </div>
            </div>
          </Col>

          {/* Approved Requests */}
          <Col xs={12} sm={6} lg={4}>
            <div className="p-4 rounded shadow-sm card-green h-100">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="mb-1 text-muted">Approved Requests</p>
                  <h5 className="fw-bold">{dashboardStats.approvedRequest}</h5>
                  <small className="text-success">Processed successfully</small>
                </div>
                <i className="fa-solid fa-check-circle text-success fs-4"></i>
              </div>
            </div>
          </Col>

          {/* Pending Requests */}
          <Col xs={12} sm={6} lg={4}>
            <div className="p-4 rounded shadow-sm card-green h-100">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="mb-1 text-muted">Pending Requests</p>
                  <h5 className="fw-bold">{dashboardStats.pendingRequest}</h5>
                  <small className="text-warning">Awaiting review</small>
                </div>
                <i className="fa-solid fa-clock text-warning fs-4"></i>
              </div>
            </div>
          </Col>
        </Row>

        {/* Table */}
        <div className="mt-4">
          <DashboardTable />
        </div>
      </Container>
    </div>
  );
};

export default DashboardCard;
