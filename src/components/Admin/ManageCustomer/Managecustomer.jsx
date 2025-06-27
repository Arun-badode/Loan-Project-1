import React, { useState } from 'react';
import { Button, Table, Badge, InputGroup, Form } from 'react-bootstrap';
import AddCustomerModal from './AddCustomerModal';
import CustomerDetailsModal from './CustomerDetailsModal';
import EditCreditModal from './EditCreditModal';
import DocumentsModal from './DocumentsModal';
import DisqualifyModal from './DisqualifyModal';

const ManageCustomer = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [showDisqualifyModal, setShowDisqualifyModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    {
      id: 1,
      name: "John Doe",
      company: "ABC Corp",
      email: "john@abc.com",
      approvedLimit: 50000,
      factorRate: 1.2,
      term: "12 months",
      documents: ["PAN.pdf", "GST.pdf"],
      currentBalance: 20000,
      status: "Active",
      phone: "1234567890"
    },
    {
      id: 2,
      name: "Jane Smith",
      company: "XYZ Ltd",
      email: "jane@xyz.com",
      approvedLimit: 75000,
      factorRate: 1.1,
      term: "18 months",
      documents: ["PAN.pdf"],
      currentBalance: 35000,
      status: "Under Review",
      phone: "9876543210"
    },
    {
      id: 3,
      name: "Bob Johnson",
      company: "QWE Inc",
      email: "bob@qwe.com",
      approvedLimit: 100000,
      factorRate: 1.3,
      term: "24 months",
      documents: ["PAN.pdf", "GST.pdf", "Address.pdf"],
      currentBalance: 50000,
      status: "Disqualified",
      phone: "5555555555"
    }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active': return <Badge bg="success">{status}</Badge>;
      case 'Under Review': return <Badge bg="warning" text="dark">{status}</Badge>;
      case 'Disqualified': return <Badge bg="danger">{status}</Badge>;
      default: return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowDetailsModal(true);
  };

  const handleEditCredit = (customer) => {
    setSelectedCustomer(customer);
    setShowEditModal(true);
  };

  const handleViewDocuments = (customer) => {
    setSelectedCustomer(customer);
    setShowDocsModal(true);
  };

  const handleDisqualify = (customer) => {
    setSelectedCustomer(customer);
    setShowDisqualifyModal(true);
  };

  return (
    <div className="container mt-4">
      {/* Page Header and Search */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
        <div>
          <h4 className="mb-1">Customers Management</h4>
          <p className="mb-0">List of all customers and manage their details</p>
        </div>
        <div className="d-flex gap-2">
          <InputGroup>
            <InputGroup.Text>
              <i className="fas fa-search"></i>
            </InputGroup.Text>
            <Form.Control
              placeholder="Search customers..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Button variant="success" onClick={() => setShowAddModal(true)}>
            + Add Customer
          </Button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="card shadow-sm">
        <div className="card-body card-green">
          <div className="table-responsive">
            <Table hover className="mb-0 table-green">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Approved Limit</th>
                  <th>Factor Rate</th>
                  <th>Term</th>
                  <th>Documents</th>
                  <th>Current Balance</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.company}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{formatCurrency(customer.approvedLimit)}</td>
                    <td>{customer.factorRate}</td>
                    <td>{customer.term}</td>
                    <td>
                      {customer.documents.map((doc, idx) => (
                        <Badge bg="light" text="dark" className="me-1" key={idx}>{doc}</Badge>
                      ))}
                    </td>
                    <td>{formatCurrency(customer.currentBalance)}</td>
                    <td>{getStatusBadge(customer.status)}</td>
                    <td>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-success p-0 me-2"
                        title="View Details"
                        onClick={() => handleViewDetails(customer)}
                      >
                        <i className="fas fa-eye"></i>
                      </Button>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-primary p-0 me-2"
                        title="Update Limit / Factor Rate"
                        onClick={() => handleEditCredit(customer)}
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-warning p-0 me-2"
                        title="Request More Documents"
                        onClick={() => handleViewDocuments(customer)}
                      >
                        <i className="fas fa-file-alt"></i>
                      </Button>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-danger p-0"
                        title="Mark as Disqualified"
                        onClick={() => handleDisqualify(customer)}
                      >
                        <i className="fas fa-user-slash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {/* Pagination - you can add your pagination logic here */}
        </div>
      </div>

      {/* Modal Components */}
      <AddCustomerModal show={showAddModal} handleClose={() => setShowAddModal(false)} />
      <CustomerDetailsModal
        show={showDetailsModal}
        handleClose={() => setShowDetailsModal(false)}
        customer={selectedCustomer}
      />
      <EditCreditModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        customer={selectedCustomer}
      />
      <DocumentsModal
        show={showDocsModal}
        handleClose={() => setShowDocsModal(false)}
        customer={selectedCustomer}
      />
      <DisqualifyModal
        show={showDisqualifyModal}
        handleClose={() => setShowDisqualifyModal(false)}
        customer={selectedCustomer}
      />
    </div>
  );
};

export default ManageCustomer;