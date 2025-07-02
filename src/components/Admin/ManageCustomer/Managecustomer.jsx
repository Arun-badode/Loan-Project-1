import React, { useEffect, useState } from 'react';
import { Button, Table, Badge, InputGroup, Form, Row, Col } from 'react-bootstrap';
import AddCustomerModal from './AddCustomerModal';
import CustomerDetailsModal from './CustomerDetailsModal';
import EditCreditModal from './EditCreditModal';
import DocumentsModal from './DocumentsModal';
import DisqualifyModal from './DisqualifyModal';
import BASE_URL from '../../../utils/baseURL';
import axiosInstance from '../../../utils/axiosInstance';

const ManageCustomer = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [showDisqualifyModal, setShowDisqualifyModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

   const [customers, setCustomers] = useState([]);
// Fetch customers from the API
  const fetchCustomers = async () => {
    try {
      const response = await axiosInstance.get(`/custumers`);
      console.log((response.data.customers));
      setCustomers(response.data.customers);
    } catch (err) {
      console.error("❌ Error fetching customers:", err);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

const handleDelete = async (customerId) => {
  const confirmDelete = window.confirm("Are you sure you want to permanently delete this customer? This action cannot be undone.");

  if (confirmDelete) {
    try {
      const response = await axiosInstance.delete(`/deleteCustomer/${customerId}`);
      alert("✅ Customer deleted successfully.");
      
      // 🔁 Refresh customer list
      fetchCustomers();
    } catch (error) {
      console.error("❌ Error deleting customer:", error);
      alert("❌ Failed to delete customer. Please try again.");
    }
  }
};


// Filter customers based on search term
  const filteredCustomers = customers?.filter(customer =>
    customer?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
    customer?.company?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
    customer?.email?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

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
      <Row className="align-items-center justify-content-between g-3 mb-3 flex-column flex-md-row">
        {/* Left Side: Heading + Subheading */}
        <Col xs="auto" className="text-start">
          <div className="d-flex flex-column">
            <h4 className="mb-1 page-heading">Customers Management</h4>
            <p className="mb-0 small text-muted">List of all customers and manage their details</p>
          </div>
        </Col>

        {/* Right Side: Search + Button */}
        <Col xs={6} md="auto" className="ms-md-auto w-md-auto">
          <div className="d-flex flex-row align-items-center gap-2">
            <div className="input-group flex-grow-1">
              <span className="input-group-text">  <i className="fas fa-search" />  </span>
              <input   type="text"   className="form-control"   placeholder="Search customers..." defaultValue="" onChange={(e)=> setSearchTerm(e.target.value)}   />
            </div>
            <button  className="btn btn-success text-nowrap"  title="Add New Customer"  onClick={() => setShowAddModal(true)}>
              + Add Customer </button>
          </div>
        </Col>
      </Row>
      {/* Customers Table */}
      <div className="card shadow-sm">
        <div className="card-body card-green">
          <div className="table-responsive">
            <Table hover className="mb-0 table-green">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Credit Line</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers?.map((customer,index) => (
                  <tr key={customer.id}>
                    <td>{index+1}</td>
                    <td>{customer?.customerName}</td>
                    <td>{customer?.companyName || "demo"}</td>
                    <td>{customer?.email}</td>
                    <td>{customer?.phoneNumber}</td>
                    <td>${customer?.creditLine}</td>
                   <td>
                   <span className={`badge text-capitalize fw-semibold px-3 py-1 
                   ${customer.customerStatus === "active" ? "bg-success" :
                    customer.customerStatus === "Suspended" ? "bg-danger" :  "bg-warning text-dark"}`}> {customer.customerStatus} </span></td>

                    <td>
                      <Button variant="link" size="sm"className="text-success p-0 fs-5 me-2"
                        title="View Details" onClick={() => handleViewDetails(customer)}> <i className="fas fa-eye"></i>
                      </Button>
                     {customer.customerStatus === "active" && (
                     <Button   variant="link"   size="sm"   className="text-primary p-0 fs-5 me-2"   title="Update Limit / Factor Rate"
                      onClick={() => handleEditCredit(customer)} > <i className="fas fa-edit"></i></Button> )}
                      <Button   variant="link"   size="sm"   className="text-warning p-0 fs-5 me-2"   title="Request More Documents"
                        onClick={() => handleViewDocuments(customer)} >
                        <i className="fas fa-file-alt"></i>
                      </Button>
                      <Button  variant="link"  size="sm"  className="text-danger p-0 me-2 fs-5"  title="Mark as Disqualified"
                        onClick={() => handleDisqualify(customer)} >
                        <i className="fas fa-user-slash"></i> </Button>

                        <Button  variant="link"  size="sm"  className="text-danger p-0 fs-5"  title="Delete Customer"
                       onClick={() => handleDelete(customer._id)} ><i className="fas fa-trash-alt"></i></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* Modal Components */}
      <AddCustomerModal show={showAddModal} handleClose={() => setShowAddModal(false)} />

      <CustomerDetailsModal show={showDetailsModal}  handleClose={() => setShowDetailsModal(false)}
        customer={selectedCustomer} />

      <EditCreditModal show={showEditModal} handleClose={() => setShowEditModal(false)}
        customer={selectedCustomer}/>

      <DocumentsModal  show={showDocsModal}  handleClose={() => setShowDocsModal(false)}
        customer={selectedCustomer} />

      <DisqualifyModal   show={showDisqualifyModal}    handleClose={() => setShowDisqualifyModal(false)}
       customer={selectedCustomer} />
    </div>
  );
};

export default ManageCustomer;