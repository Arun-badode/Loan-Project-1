import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';

const Discount = () => {
  const [customers, setCustomers] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [formData, setFormData] = useState({
    customerId: '',
    discountTen: '10',
    startDateTen: '',
    endDateTen: '',
    discountFive: '5',
    startDateFive: '',
    endDateFive: '',
  });
  const [editingId, setEditingId] = useState(null);

  // 🟡 Load customers for dropdown
  const fetchCustomers = async () => {
    try {
      const res = await axiosInstance.get('/custumers');
      setCustomers(res.data.customers);
    } catch (error) {
      console.error('Error fetching customers', error);
    }
  };

  // 🟢 Load existing discounts
  const fetchDiscounts = async () => {
    try {
      const res = await axiosInstance.get('/discount');
      setDiscounts(res.data.data || []);
    } catch (error) {
      console.error('Error fetching discounts', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchDiscounts();
  }, []);

  // 📝 Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🟢 Submit (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axiosInstance.put(`/discount/${editingId}`, formData);
        alert('Discount updated successfully!');
      } else {
        await axiosInstance.post('/discount', formData);
        alert('Discount created successfully!');
      }

      setFormData({
        customerId: '',
        discountTen: '',
        startDateTen: '',
        endDateTen: '',
        discountFive: '',
        startDateFive: '',
        endDateFive: '',
      });
      setEditingId(null);
      fetchDiscounts();
    } catch (error) {
      console.error('Error submitting discount data', error);
      alert('Failed to submit discount');
    }
  };

  // 🗑️ Delete discount
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this discount?')) return;
    try {
      await axiosInstance.delete(`/discount/${id}`);
      alert('Deleted successfully!');
      fetchDiscounts();
    } catch (error) {
      console.error('Delete failed', error);
      alert('Error deleting discount');
    }
  };

  // ✏️ Edit discount
  const handleEdit = (discount) => {
    setFormData({ ...discount });
    setEditingId(discount._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return '-';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // month is 0-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

  return (
    <div className="container mt-4">
      <h4 className="mb-3">
        {editingId ? 'Edit Early Payoff Discount' : 'Create Early Payoff Discount'}
      </h4>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Select Customer</label>
          <select
            name="customerId"
            className="form-select"
            value={formData.customerId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Customer --</option>
            {customers.map((cust) => (
              <option key={cust._id} value={cust._id}>
                {cust.customerName}
              </option>
            ))}
          </select>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">10% Discount</label>
            <input
              type="number"
              name="discountTen"
              className="form-control"
              value={formData.discountTen}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label className="form-label">Start Date (10%)</label>
            <input
              type="date"
              name="startDateTen"
              className="form-control"
              value={formData.startDateTen}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label className="form-label">End Date (10%)</label>
            <input
              type="date"
              name="endDateTen"
              className="form-control"
              value={formData.endDateTen}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">5% Discount</label>
            <input
              type="number"
              name="discountFive"
              className="form-control"
              value={formData.discountFive}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label className="form-label">Start Date (5%)</label>
            <input
              type="date"
              name="startDateFive"
              className="form-control"
              value={formData.startDateFive}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label className="form-label">End Date (5%)</label>
            <input
              type="date"
              name="endDateFive"
              className="form-control"
              value={formData.endDateFive}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-success mt-3">
          {editingId ? 'Update Discount' : 'Create Discount'}
        </button>
      </form>

      {/* List All Discounts */}    
      <hr className="my-4" />
      <h5>Existing Discounts</h5>
       <div className="table-responsive">
      <table className="table table-bordered">
     <thead>
  <tr>
    <th>Customer</th>
    <th>10% (Start-End)</th>
    <th>10% Amount</th>
    <th>5% (Start-End)</th>
    <th>5% Amount</th>
    <th>Status</th>
    <th>Actions</th>
  </tr>
</thead>
<tbody>
  {discounts.map((d) => (
    <tr key={d._id}>
      <td>{customers.find(c => c._id === d.customerId)?.customerName || d.customerId}</td>
      <td>{d.discountTen}% ({formatDate(d.startDateTen)} to {formatDate(d.endDateTen)})</td>
      <td>${parseFloat(d.TenDicountAmount || 0).toFixed(2)}</td>
      <td>{d.discountFive}% ({formatDate(d.startDateFive)} to {formatDate(d.endDateFive)})</td>
      <td>${parseFloat(d.FiveDicountAmount || 0).toFixed(2)}</td>
      <td>
        <span className={`badge bg-${d.discountStatus === 'Active' ? 'success' : 'secondary'}`}>
          {d.discountStatus}
        </span>
      </td>
      <td>
        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(d)}>
          Edit
        </button>
        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(d._id)}>
          Delete
        </button>
      </td>
    </tr>
  ))}
  {discounts.length === 0 && (
    <tr>
      <td colSpan="7" className="text-center">No discounts found.</td>
    </tr>
  )}
</tbody>

      </table>
      </div>
    </div>
  );
};

export default Discount;
