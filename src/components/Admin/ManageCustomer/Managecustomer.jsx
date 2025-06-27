import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddCustomerModal from "./AddCustomerModal";
import CustomerDetailsModal from "./CustomerDetailsModal";
import EditCreditLineModal from "./EditCreditLineModal";

const Managecustomer = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCustomerDetailsModal, setShowCustomerDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const customers = [
    {
      id: "CUST-001",
      name: "John Smith",
      phone: "+1 (555) 123-4567",
      email: "john.smith@example.com",
      creditLine: 50000,
      status: "Active",
      company: "Smith Enterprises",
    },
    {
      id: "CUST-002",
      name: "Sarah Johnson",
      phone: "+1 (555) 987-6543",
      email: "sarah.j@example.com",
      creditLine: 75000,
      status: "Active",
      company: "Johnson & Associates",
    },
    {
      id: "CUST-003",
      name: "Michael Chen",
      phone: "+1 (555) 456-7890",
      email: "mchen@example.com",
      creditLine: 100000,
      status: "Active",
      company: "Chen Technologies",
    },
    {
      id: "CUST-004",
      name: "Emily Wilson",
      phone: "+1 (555) 234-5678",
      email: "e.wilson@example.com",
      creditLine: 30000,
      status: "Inactive",
      company: "Wilson Retail Group",
    },
    {
      id: "CUST-005",
      name: "David Rodriguez",
      phone: "+1 (555) 876-5432",
      email: "drodriguez@example.com",
      creditLine: 85000,
      status: "Active",
      company: "Rodriguez Imports",
    },
  ];

  return (
    <div className="container mt-4">
      {/* Page Heading */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
        {/* Left Side: Heading & Subheading */}
        <div className="text-start">
          <h4 className="page-heading mb-1">Manage Customer</h4>
          <p className="page-subheading mb-0">View and manage customer credit details</p>
        </div>

        {/* Right Side: Search & Button aligned in one row */}
        <div className="d-flex flex-column flex-sm-row align-items-stretch gap-2">
          {/* Search Field */}
          <div className="input-group" style={{ maxWidth: "280px" }}>
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control input-green"
              placeholder="Search customers..."
            />
          </div>

          {/* Button */}
          <Button
            variant="success"
            className="w-100 w-sm-auto btn-green"
            onClick={() => setShowModal(true)}
          >
            + Add New Customer
          </Button>
        </div>
      </div>


      {/* Card Table */}
      <div className="card shadow-sm">
        <div className="card-body card-green">
          <div className="table-responsive">
            <table className="table table-hover align-middle table-green">
              <thead className="table-light">
                <tr>
                  <th>Customer Name</th>
                  <th>Customer ID</th>
                  <th>Contact Number</th>
                  <th>Email</th>
                  <th>Credit Line</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <div className="fw-bold">{customer.name}</div>
                      <div className="text-muted small">{customer.company}</div>
                    </td>
                    <td>{customer.id}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.email}</td>
                    <td>${customer.creditLine.toLocaleString()}</td>
                    <td>
                      <span className={
                        customer.status === "Active"
                          ? "badge-success-soft py-1 px-2 rounded-pill"
                          : customer.status === "Inactive"
                            ? "badge-danger-soft py-1 px-2 rounded-pill"

                            : "badge-status-pending"
                      }>
                        {customer.status}
                      </span>

                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-link text-success me-2"
                        onClick={() => setShowCustomerDetailsModal(true)}
                      >
                        <i className="fas fa-eye me-1"></i>
                      </button>
                      <CustomerDetailsModal
                        show={showCustomerDetailsModal}
                        handleClose={() => setShowCustomerDetailsModal(false)}
                      />
                      <button
                        className="btn btn-sm btn-link text-success me-2"
                        onClick={() => setShowEditModal(true)}
                      >
                        <i className="fas fa-edit me-1"></i>
                      </button>
                      <EditCreditLineModal
                        show={showEditModal}
                        handleClose={() => setShowEditModal(false)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination Info */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">
            <div className="text-muted mb-2 mb-md-0">
              Showing <span className="fw-bold">1</span> to{" "}
              <span className="fw-bold">5</span> of{" "}
              <span className="fw-bold">5</span> customers
            </div>
            <div>
              <button className="btn btn-outline-success  me-2" >
                <i className="fas fa-chevron-left me-1"></i> Previous
              </button>
              <button className="btn btn-outline-success " >
                Next <i className="fas fa-chevron-right ms-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <AddCustomerModal show={showModal} handleClose={() => setShowModal(false)} />
    </div>
  );
};

export default Managecustomer;
