import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "@fortawesome/fontawesome-free/css/all.min.css";

const pieData = [
  { name: "Loaned", value: 60 },
  { name: "Available", value: 40 },
];

const pieColors = ["#22c55e", "#6c757d"];

const barData = [
  { year: "Jan", amount: 50000 },
  { year: "Feb", amount: 40000 },
  { year: "Mar", amount: 45000 },
  { year: "Apr", amount: 47000 },
  { year: "May", amount: 52000 },
];

const DashboardCharts = () => {
  return (
    <div className="bg-success-subtle">
      <div>
        <Row className="g-4">
          {/* Credit Summary */}
          <Col xs={12} md={6}>
            <div className="bg-white p-4 rounded shadow-sm h-100">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <h4 className="fw-bold mb-2 mb-md-0">Credit Summary</h4>
              </div>

              <div className="d-flex flex-column flex-md-row align-items-center mt-3">
                <div style={{ width: "100%", maxWidth: 250, height: 200 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={45}
                        outerRadius={65}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={pieColors[index]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="ms-md-5 mt-4 mt-md-0 text-center text-md-start">
                  <p className="mb-1 text-muted">Total Loan</p>
                  <h5 className="fw-bold">$150,000,000</h5>
                  <p className="mb-1 mt-3 text-muted">Pending Balance</p>
                  <h6 className="fw-bold">$90,000,000</h6>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-3 mt-4 justify-content-center justify-content-md-start">
                <div className="d-flex align-items-center gap-2">
                  <div style={{ width: 12, height: 12, backgroundColor: "#22c55e" }}></div>
                  <small>Amount Loaned ($)</small>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div style={{ width: 12, height: 12, backgroundColor: "#000000" }}></div>
                  <small>Available Balance ($)</small>
                </div>
              </div>
            </div>
          </Col>

          {/* Monthly Returns */}
          <Col xs={12} md={6}>
            <div className="bg-white p-4 rounded shadow-sm h-100">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <h4 className="fw-bold mb-2 mb-md-0">Monthly Returns</h4>
                <div className="text-muted">
                  2024
                </div>
              </div>

              <div style={{ width: "100%", height: 250 }} className="mt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} barSize={25}>
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#22c55e" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DashboardCharts;
